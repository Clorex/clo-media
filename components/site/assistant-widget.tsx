"use client";

import * as React from "react";
import { brand } from "@/lib/content";

type Msg = { from: "user" | "assistant"; text: string };

const INITIAL_MSGS: Msg[] = [
  { from: "assistant", text: "Hi, I’m Clo Media AI. What do you want to work on today?" },
];

export function AssistantWidget() {
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState<Msg[]>(INITIAL_MSGS);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function newChat() {
    setMsgs(INITIAL_MSGS);
    setInput("");
    setLoading(false);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMsgs: Msg[] = [...msgs, { from: "user", text }];

    setMsgs(nextMsgs);
    setInput("");
    setLoading(true);

    try {
      const messages = nextMsgs.slice(-20).map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ messages }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Assistant error");

      setMsgs((m) => [...m, { from: "assistant", text: data.reply || "Okay." }]);
    } catch (err: any) {
      const reason = err?.message ? String(err.message) : "I couldn’t respond right now.";
      setMsgs((m) => [
        ...m,
        {
          from: "assistant",
          text: `${reason}\n\nYou can continue on WhatsApp and I’ll help immediately.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80]">
      {open ? (
        <div className="w-[360px] overflow-hidden rounded-[1.75rem] border border-brand-700/15 bg-white shadow-[0_40px_110px_rgba(242,92,5,0.18)]">
          <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />

          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <div className="text-sm font-extrabold text-brand-700">Clo Media AI</div>
              <div className="text-[11px] font-semibold text-ink/60">
                Graphics • Web • Branding • Business
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="rounded-xl border border-brand-700/20 bg-white px-3 py-1 text-sm font-extrabold text-ink disabled:opacity-50"
                onClick={newChat}
                disabled={loading}
                title="Start a fresh conversation"
              >
                New chat
              </button>

              <button
                className="rounded-xl border border-brand-700/20 bg-white px-3 py-1 text-sm font-extrabold text-ink"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>

          <div className="max-h-[340px] space-y-3 overflow-auto px-4 pb-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  "rounded-2xl border px-3 py-2 text-sm " +
                  (m.from === "assistant"
                    ? "border-brand-700/15 bg-brand-50 text-ink"
                    : "border-brand-700/20 bg-white text-ink")
                }
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
            ))}

            <div className="mt-2 grid gap-2">
              <a
                href={brand.whatsapp}
                target="_blank"
                className="rounded-2xl border border-brand-700/20 bg-gradient-to-r from-brand-200 via-brand-500/30 to-brand-200 px-3 py-2 text-sm font-extrabold text-ink"
              >
                Continue on WhatsApp
              </a>
            </div>
          </div>

          <div className="border-t border-brand-700/12 bg-white p-3">
            <div className="flex gap-2">
              <input
                className="w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    send();
                  }
                }}
              />

              <button
                onClick={send}
                disabled={loading}
                className="rounded-xl border border-brand-700/20 bg-gradient-to-r from-brand-200 via-brand-500/30 to-brand-200 px-4 py-2 text-sm font-extrabold text-ink disabled:opacity-60"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="
            group relative rounded-full
            border border-brand-700/25
            bg-slate-950
            px-5 py-3
            text-sm font-extrabold text-white
            shadow-[0_24px_70px_rgba(2,6,23,0.35)]
            transition
            hover:shadow-[0_28px_90px_rgba(2,6,23,0.45)]
            active:translate-y-[1px]
            focus:outline-none focus:ring-4 focus:ring-brand-500/25
          "
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_0_3px_rgba(242,92,5,0.15)]" />
            Chat with AI
          </span>
          <span
            className="
              pointer-events-none absolute inset-0 rounded-full
              opacity-0 transition-opacity
              group-hover:opacity-100
              bg-white/10
            "
          />
        </button>
      )}
    </div>
  );
}