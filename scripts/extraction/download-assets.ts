import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

interface TelemetryFile {
  images: Array<{
    src: string;
    alt: string;
    naturalWidth: number;
    naturalHeight: number;
    objectFit: string;
    objectPosition: string;
    mixBlendMode: string;
    rect: { width: number; height: number };
  }>;
  bgImages: Array<{ backgroundImage: string }>;
  fonts: Array<{ family: string; weight: string; style: string }>;
}

function sanitizeFilename(urlStr: string, fallbackExt: string): string {
  try {
    const u = new URL(urlStr);
    const base = path.basename(u.pathname) || 'asset';
    const clean = base.replace(/[^a-zA-Z0-9._-]/g, '_');
    if (path.extname(clean)) return clean;
    return `${clean}${fallbackExt}`;
  } catch {
    return `asset_${Date.now()}${fallbackExt}`;
  }
}

async function downloadWithRetry(url: string, retries = 2): Promise<{ buffer: Buffer; contentType: string; finalUrl: string } | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 20000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ab = await res.arrayBuffer();
      return {
        buffer: Buffer.from(ab),
        contentType: res.headers.get('content-type') || 'application/octet-stream',
        finalUrl: res.url,
      };
    } catch (e) {
      if (i === retries) {
        console.warn(`Failed download ${url}:`, e);
        return null;
      }
      await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
  return null;
}

async function main() {
  const researchDir = path.resolve(process.cwd(), 'research');
  const pagesDir = path.join(researchDir, 'reference', 'pages');
  const masterImgDir = path.resolve(process.cwd(), 'assets-source', 'original', 'images');
  const masterFontDir = path.resolve(process.cwd(), 'assets-source', 'original', 'fonts');
  const publicImgDir = path.resolve(process.cwd(), 'public', 'assets', 'images', 'extracted');
  const publicFontDir = path.resolve(process.cwd(), 'public', 'assets', 'fonts');

  await fs.mkdir(masterImgDir, { recursive: true });
  await fs.mkdir(masterFontDir, { recursive: true });
  await fs.mkdir(publicImgDir, { recursive: true });
  await fs.mkdir(publicFontDir, { recursive: true });

  const netUrlsPath = path.join(researchDir, 'manifests', 'discovered-network-urls.json');
  const netUrls: { fonts: string[]; media: string[] } = JSON.parse(await fs.readFile(netUrlsPath, 'utf-8'));

  // Map each URL to routes where it appeared
  const urlToRoutes = new Map<string, Set<string>>();
  const pageDirs = await fs.readdir(pagesDir);
  for (const dir of pageDirs) {
    const tPath = path.join(pagesDir, dir, 'telemetry-1440.json');
    try {
      const t: TelemetryFile = JSON.parse(await fs.readFile(tPath, 'utf-8'));
      for (const img of t.images) {
        if (!img.src || img.src.startsWith('data:')) continue;
        if (!urlToRoutes.has(img.src)) urlToRoutes.set(img.src, new Set());
        urlToRoutes.get(img.src)!.add(dir);
      }
    } catch {
      // ignore missing telemetry
    }
  }

  const allImages = new Set<string>([...urlToRoutes.keys(), ...netUrls.media.filter((u) => !u.includes('/assets/') || /\.(png|jpe?g|webp|avif|svg|gif)/i.test(u))]);
  const allFonts = new Set<string>(netUrls.fonts);

  const hashToMaster = new Map<string, string>();
  const assetRecords: Record<string, unknown>[] = [];
  let idx = 0;

  for (const imgUrl of allImages) {
    if (!imgUrl.startsWith('http')) continue;
    // Skip Framer promotional badges/templates if identifiable, still log
    const res = await downloadWithRetry(imgUrl);
    if (!res) continue;

    const sha256 = crypto.createHash('sha256').update(res.buffer).digest('hex');
    const extMap: Record<string, string> = {
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'image/webp': '.webp',
      'image/avif': '.avif',
      'image/svg+xml': '.svg',
      'image/gif': '.gif',
    };
    const mime = res.contentType.split(';')[0].trim();
    const ext = extMap[mime] || '.bin';
    if (ext === '.bin' && !/\.(png|jpe?g|webp|avif|svg|gif|mp4|webm)/i.test(imgUrl)) continue;

    idx++;
    const id = `img-${String(idx).padStart(3, '0')}`;
    const filename = `${id}-${sanitizeFilename(imgUrl, ext)}`;

    let duplicateOf: string | null = null;
    let masterPath = '';
    let deliveryPath = '';
    let width: number | null = null;
    let height: number | null = null;
    let hasAlpha = false;

    if (hashToMaster.has(sha256)) {
      duplicateOf = hashToMaster.get(sha256)!;
      masterPath = duplicateOf;
    } else {
      masterPath = `assets-source/original/images/${filename}`;
      await fs.writeFile(path.resolve(process.cwd(), masterPath), res.buffer);
      hashToMaster.set(sha256, masterPath);

      if (ext === '.svg') {
        deliveryPath = `public/assets/images/extracted/${filename}`;
        await fs.writeFile(path.resolve(process.cwd(), deliveryPath), res.buffer);
      } else if (['.png', '.jpg', '.webp', '.avif'].includes(ext)) {
        try {
          const meta = await sharp(res.buffer).metadata();
          width = meta.width ?? null;
          height = meta.height ?? null;
          hasAlpha = Boolean(meta.hasAlpha);
          const outName = filename.replace(/\.[^.]+$/, hasAlpha ? '.webp' : '.webp');
          deliveryPath = `public/assets/images/extracted/${outName}`;
          await sharp(res.buffer).webp({ quality: 88, alphaQuality: 95 }).toFile(path.resolve(process.cwd(), deliveryPath));
        } catch {
          deliveryPath = `public/assets/images/extracted/${filename}`;
          await fs.writeFile(path.resolve(process.cwd(), deliveryPath), res.buffer);
        }
      }
    }

    assetRecords.push({
      id,
      assetType: ext === '.svg' ? 'svg' : 'image',
      sourceUrl: imgUrl,
      finalUrl: res.finalUrl,
      referenceRoutes: Array.from(urlToRoutes.get(imgUrl) || []),
      mimeType: mime,
      originalWidth: width,
      originalHeight: height,
      fileSize: res.buffer.length,
      hasTransparency: hasAlpha,
      masterPath,
      deliveryPath,
      sha256,
      duplicateOf,
      licenseStatus: 'reference-public-asset-requires-rights-verification',
      originalOrReplacement: 'reference-original',
      acquisitionStatus: 'acquired',
    });
  }

  let fontIdx = 0;
  for (const fontUrl of allFonts) {
    if (!fontUrl.startsWith('http')) continue;
    const res = await downloadWithRetry(fontUrl);
    if (!res) continue;
    fontIdx++;
    const sha256 = crypto.createHash('sha256').update(res.buffer).digest('hex');
    const filename = `font-${String(fontIdx).padStart(2, '0')}-${sanitizeFilename(fontUrl, '.woff2')}`;
    const masterPath = `assets-source/original/fonts/${filename}`;
    const deliveryPath = `public/assets/fonts/${filename}`;
    await fs.writeFile(path.resolve(process.cwd(), masterPath), res.buffer);
    await fs.writeFile(path.resolve(process.cwd(), deliveryPath), res.buffer);

    assetRecords.push({
      id: `font-${String(fontIdx).padStart(2, '0')}`,
      assetType: 'font',
      sourceUrl: fontUrl,
      finalUrl: res.finalUrl,
      mimeType: res.contentType.split(';')[0].trim(),
      fileSize: res.buffer.length,
      masterPath,
      deliveryPath,
      sha256,
      licenseStatus: 'reference-font-verify-license',
      originalOrReplacement: 'reference-original',
      acquisitionStatus: 'acquired',
    });
  }

  await fs.writeFile(
    path.join(researchDir, 'manifests', 'assets.json'),
    JSON.stringify({ totalAssets: assetRecords.length, assets: assetRecords }, null, 2),
    'utf-8'
  );
  console.log(`Downloaded & cataloged ${assetRecords.length} assets (${idx} images, ${fontIdx} fonts).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
