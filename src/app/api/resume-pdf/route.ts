import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';
import {
  RESUME_AWARDS,
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_LANGUAGES,
  RESUME_PROFILE,
  RESUME_SKILLS,
} from '@/content/resume';

function escapePdfText(input: string): string {
  return input
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, (ch) => {
      if (ch === '—' || ch === '–') return '-';
      if (ch === '·') return '-';
      if (ch === 'é') return 'e';
      if (ch === 'ä') return 'ae';
      if (ch === '’' || ch === '‘') return "'";
      if (ch === '“' || ch === '”') return '"';
      return ' ';
    });
}

function wrapLine(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let current = '';
  for (const w of words) {
    if (!current) {
      current = w;
    } else if (current.length + 1 + w.length <= maxChars) {
      current += ` ${w}`;
    } else {
      out.push(current);
      current = w;
    }
  }
  if (current) out.push(current);
  return out;
}

function buildResumePdf(): Buffer {
  const ops: string[] = [];
  let y = 785;

  const textLine = (
    text: string,
    x: number,
    size: number,
    font: 'F1' | 'F2' = 'F1',
    step = size * 1.35
  ) => {
    ops.push(`BT /${font} ${size} Tf ${x} ${y.toFixed(1)} Td (${escapePdfText(text)}) Tj ET`);
    y -= step;
  };

  textLine('MARA VOSS', 48, 24, 'F2', 24);
  textLine(
    `${siteConfig.role}  |  ${siteConfig.location}  |  ${siteConfig.email}`,
    48,
    10,
    'F1',
    22
  );

  ops.push('0.8 w 48 ' + (y + 8).toFixed(1) + ' m 547 ' + (y + 8).toFixed(1) + ' l S');
  y -= 10;

  textLine('PROFILE', 48, 9, 'F2', 14);
  for (const line of wrapLine(RESUME_PROFILE, 88)) {
    textLine(line, 48, 10, 'F1', 14);
  }
  y -= 10;

  textLine('EXPERIENCE', 48, 9, 'F2', 16);
  for (const job of RESUME_EXPERIENCE) {
    textLine(`${job.role} - ${job.company} (${job.period})`, 48, 11, 'F2', 14);
    textLine(job.summary, 48, 9.5, 'F1', 13);
    for (const h of job.highlights) {
      for (const wrapped of wrapLine(`- ${h}`, 84)) {
        textLine(wrapped, 58, 9, 'F1', 12);
      }
    }
    y -= 6;
  }

  y -= 4;
  textLine('SKILLS & TOOLS', 48, 9, 'F2', 14);
  for (const line of wrapLine(`Design: ${RESUME_SKILLS.design.join(', ')}`, 88)) {
    textLine(line, 48, 9.5, 'F1', 13);
  }
  for (const line of wrapLine(`Code: ${RESUME_SKILLS.code.join(', ')}`, 88)) {
    textLine(line, 48, 9.5, 'F1', 13);
  }
  textLine(`Tools: ${RESUME_SKILLS.tools.join(', ')}`, 48, 9.5, 'F1', 16);

  textLine('EDUCATION & AWARDS', 48, 9, 'F2', 14);
  for (const ed of RESUME_EDUCATION) {
    textLine(
      `${ed.degree} - ${ed.school} (${ed.period}) | ${ed.note}`,
      48,
      9.5,
      'F1',
      13
    );
  }
  for (const aw of RESUME_AWARDS) {
    textLine(`${aw.title} - ${aw.organization} (${aw.year}) | ${aw.note}`, 48, 9.5, 'F1', 14);
  }

  const langs = RESUME_LANGUAGES.map((l) => `${l.name} (${l.level})`).join(', ');
  textLine(`Languages: ${langs}`, 48, 9.5, 'F1', 14);

  const streamContent = ops.join('\n');
  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${Buffer.byteLength(streamContent, 'utf8')} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  ];

  const header = '%PDF-1.4\n';
  const offsets: number[] = [0];
  let cursor = Buffer.byteLength(header, 'utf8');
  for (const obj of objects) {
    offsets.push(cursor);
    cursor += Buffer.byteLength(obj, 'utf8');
  }

  const xrefLines = [
    `xref`,
    `0 ${objects.length + 1}`,
    `0000000000 65535 f `,
    ...offsets.slice(1).map((off) => `${String(off).padStart(10, '0')} 00000 n `),
  ];

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${cursor}\n%%EOF\n`;

  return Buffer.from(header + objects.join('') + xrefLines.join('\n') + '\n' + trailer, 'utf8');
}

export async function GET() {
  const pdf = buildResumePdf();
  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Mara-Voss-Resume-2026.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
