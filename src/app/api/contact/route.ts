import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().email('Please enter a valid email address').max(180),
  company: z.string().trim().max(120).optional().default(''),
  website: z.string().trim().max(240).optional().default(''),
  budget: z.string().trim().max(80).optional().default(''),
  timeline: z.string().trim().max(80).optional().default(''),
  services: z.array(z.string().trim().max(80)).max(6).optional().default([]),
  startWindow: z.string().trim().max(80).optional().default(''),
  brief: z
    .string()
    .trim()
    .min(10, 'Tell me a little about the project (at least 10 characters)')
    .max(4000),
  honeypot: z.string().optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Validation failed',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return NextResponse.json(
        {
          ok: true,
          mode: 'demonstration-adapter',
          referenceId: 'MV-DEMO-0000',
          receivedAt: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    const referenceId = `MV-${new Date().getFullYear()}-${String(
      Math.floor(1000 + (parsed.data.name.length * 137 + parsed.data.brief.length * 19) % 9000)
    )}`;

    return NextResponse.json(
      {
        ok: true,
        mode: 'demonstration-adapter',
        notice:
          'Local portfolio demonstration adapter received your project brief (no external message sent).',
        referenceId,
        summary: {
          name: parsed.data.name,
          email: parsed.data.email,
          company: parsed.data.company,
          budget: parsed.data.budget,
          timeline: parsed.data.timeline,
          services: parsed.data.services,
          startWindow: parsed.data.startWindow,
        },
        receivedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON request payload' },
      { status: 400 }
    );
  }
}
