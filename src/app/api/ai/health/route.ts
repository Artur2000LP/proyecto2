import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    // Prefer OpenAI for health check if present
    if (openaiKey) {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { Authorization: `Bearer ${openaiKey}` },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        return NextResponse.json({ provider: 'openai', ok: false, status: res.status, detail: text }, { status: 200 });
      }

      return NextResponse.json({ provider: 'openai', ok: true }, { status: 200 });
    }

    if (groqKey) {
      const res = await fetch('https://api.groq.com/openai/v1/models', {
        headers: { Authorization: `Bearer ${groqKey}` },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        return NextResponse.json({ provider: 'groq', ok: false, status: res.status, detail: text }, { status: 200 });
      }

      return NextResponse.json({ provider: 'groq', ok: true }, { status: 200 });
    }

    return NextResponse.json({ ok: false, message: 'No API keys configured (OPENAI_API_KEY or GROQ_API_KEY).' }, { status: 200 });
  } catch (err) {
    console.error('AI health check error:', err);
    return NextResponse.json({ ok: false, error: 'health check failed' }, { status: 500 });
  }
}
