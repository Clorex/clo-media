"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { brand } from "@/lib/content";

type Msg = { from: "user" | "assistant"; text: string };

const INITIAL_MSGS: Msg[] = [
  { from: "assistant", text: "Hi, I’m Clo Media AI. What do you want to work on today?" },
];

function cx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export function AssistantWidget() {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msgs, setMsgs] = React.useState<Msg[]>(INITIAL_MSGS);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [msgs, open]);

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
        { from: "assistant", text: `${reason}\n\nContinue on WhatsApp and I’ll help immediately.` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const popupClass =
    "w-[min(92vw,380px)] overflow-hidden rounded-[1.75rem] border border-brand-700/15 bg-white " +
    "shadow-[0_40px_110px_rgba(242,92,5,0.18)] transform transition-all duration-200 " +
    "animate-[cloPop_180ms_ease-out]";

  const buttonClass =
    "relative rounded-full border border-brand-700/25 bg-slate-950 px-5 py-3 text-sm font-extrabold text-white " +
    "shadow-[0_24px_70px_rgba(2,6,23,0.35)] transition hover:shadow-[0_28px_90px_rgba(2,6,23,0.45)] " +
    "active:translate-y-[1px] focus:outline-none focus:ring-4 focus:ring-brand-500/25";

  const ui = (
    <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
      <div className="pointer-events-auto">
        {open ? (
          <div className={popupClass}>
            <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700 clo-band" />

            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <div className="text-sm font-extrabold text-brand-700">Clo Media AI</div>
                <div className="text-[11px] font-semibold text-ink/60">
                  Ask anything • Branding • Design • Business
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="rounded-xl border border-brand-700/20 bg-white px-3 py-1 text-xs font-extrabold text-ink"
                  onClick={newChat}
                  disabled={loading}
                >
                  New
                </button>
                <button
                  className="rounded-xl border border-brand-700/20 bg-white px-3 py-1 text-xs font-extrabold text-ink"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>

            <div ref={scrollerRef} className="max-h-[360px] space-y-3 overflow-auto px-4 pb-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cx(
                    "rounded-2xl border px-3 py-2 text-sm",
                    m.from === "assistant"
                      ? "border-brand-700/15 bg-brand-50 text-ink"
                      : "border-brand-700/20 bg-white text-ink"
                  )}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              ))}

              <a
                href={brand.whatsapp}
                target="_blank"
                className="block rounded-2xl border border-brand-700/20 bg-gradient-to-r from-brand-200 via-brand-500/30 to-brand-200 px-3 py-2 text-sm font-extrabold text-ink text-center"
              >
                Continue on WhatsApp
              </a>
            </div>

            <div className="border-t border-brand-700/12 bg-white p-3">
              <div className="flex gap-2">
                <input
                  className="w-full rounded-xl border border-brand-700/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-700"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
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

            <style jsx>{`
              @keyframes cloPop {
                from {
                  opacity: 0;
                  transform: translateY(10px) scale(0.98);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>
          </div>
        ) : (
          <button onClick={() => setOpen(true)} className={buttonClass}>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              Chat with AI
            </span>
          </button>
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(ui, document.body);
}