import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const NewsletterSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address').max(180),
  honeypot: z.string().optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = NewsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || 'Please enter a valid email address',
        },
        { status: 400 }
      );
    }

    if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
      return NextResponse.json({ ok: true, mode: 'demonstration-adapter' }, { status: 200 });
    }

    return NextResponse.json(
      {
        ok: true,
        mode: 'demonstration-adapter',
        message: 'Subscribed to The studio letter (local demonstration adapter).',
        email: parsed.data.email,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request payload' }, { status: 400 });
  }
}
