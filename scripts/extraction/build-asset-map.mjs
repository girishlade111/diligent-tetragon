import fs from 'node:fs/promises';
import path from 'node:path';

async function main() {
  const researchDir = path.resolve(process.cwd(), 'research');
  const assetsManifest = JSON.parse(await fs.readFile(path.join(researchDir, 'manifests', 'assets.json'), 'utf-8'));
  const pagesSummary = JSON.parse(await fs.readFile(path.join(researchDir, 'manifests', 'extracted-pages-summary.json'), 'utf-8'));

  // Group assets by Framer base filename (without scale-down-to / id prefix)
  const byFramerHash = new Map();
  for (const a of assetsManifest.assets) {
    if (a.assetType === 'font' || a.duplicateOf) continue;
    const base = a.sourceUrl.split('?')[0].split('/').pop();
    const pixels = (a.originalWidth || 0) * (a.originalHeight || 0);
    const prev = byFramerHash.get(base);
    if (!prev || pixels > ((prev.originalWidth || 0) * (prev.originalHeight || 0))) {
      byFramerHash.set(base, a);
    }
  }

  // Create semantic map by inspecting where each base filename appears
  const semanticEntries = [];
  for (const [base, bestAsset] of byFramerHash.entries()) {
    const usages = [];
    for (const [routeId, pdata] of Object.entries(pagesSummary)) {
      for (const img of pdata.images) {
        if (img.src && img.src.includes(base)) {
          usages.push({ routeId, alt: img.alt, w: img.w, h: img.h, filter: img.filter });
        }
      }
    }
    semanticEntries.push({
      framerFile: base,
      deliveryUrl: '/' + bestAsset.deliveryPath.replace(/^public\//, ''),
      width: bestAsset.originalWidth,
      height: bestAsset.originalHeight,
      hasAlpha: bestAsset.hasTransparency,
      usages,
    });
  }

  await fs.writeFile(
    path.join(researchDir, 'manifests', 'component-assets.json'),
    JSON.stringify(semanticEntries, null, 2),
    'utf-8'
  );
  console.log(`Mapped ${semanticEntries.length} unique visual assets across all routes.`);
}

main().catch(console.error);
