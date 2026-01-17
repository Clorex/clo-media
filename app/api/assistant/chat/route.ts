import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

function systemPrompt() {
  return `
You are Clo Media AI, a helpful general-purpose assistant.

- Answer any normal question naturally.
- If the user asks for branding/design help, be practical and ask only the next most useful question.
- Keep replies concise and clear.
`.trim();
}

async function groqChat(messages: ChatMsg[]) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("Missing GROQ_API_KEY (set it in .env.local or Vercel env vars)");

  const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      max_tokens: 700,
      messages,
    }),
  });

  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(t || `Groq error: ${r.status}`);
  }

  const data = await r.json();
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Groq returned an empty response");
  }
  return text.trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    // We support BOTH formats:
    // 1) { messages: [{role, content}, ...] }  (recommended)
    // 2) { message: "hi" }                    (fallback)
    const incomingMessages = Array.isArray(body?.messages) ? body.messages : null;
    const singleMessage = String(body?.message || "").trim();

    let convo: ChatMsg[] = [{ role: "system", content: systemPrompt() }];

    if (incomingMessages) {
      convo = convo.concat(
        incomingMessages
          .filter((m: any) => m && typeof m.content === "string")
          .slice(-20)
          .map((m: any) => ({
            role:
              m.role === "system" || m.role === "assistant" || m.role === "user"
                ? m.role
                : "user",
            content: String(m.content),
          }))
      );
    } else {
      if (!singleMessage) {
        return NextResponse.json({ error: "Missing message" }, { status: 400 });
      }
      convo.push({ role: "user", content: singleMessage });
    }

    const reply = await groqChat(convo);
    return NextResponse.json({ ok: true, reply });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ? String(e.message) : "Assistant failed" },
      { status: 500 }
    );
  }
}