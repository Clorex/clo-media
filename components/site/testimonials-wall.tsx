"use client";

import * as React from "react";

export type Testimonial = {
  id?: number | string;
  name: string;
  service: string;
  text: string;
};

export function TestimonialsWall({ items }: { items: Testimonial[] }) {
  const normalized = React.useMemo(() => {
    const base = items.map((t, i) => ({
      ...t,
      side: i % 2 === 0 ? ("left" as const) : ("right" as const),
    }));
    return [...base, ...base]; // duplicate to loop
  }, [items]);

  const durationSec = Math.max(40, items.length * 2.0);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-brand-700/15 bg-white shadow-[0_24px_60px_rgba(242,92,5,0.10)]">
      <div className="h-1 w-full bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700" />

      <div className="bg-[#efeae2]">
        <div className="flex items-center justify-between gap-3 border-b border-brand-700/10 bg-white/70 px-5 py-3 backdrop-blur">
          <div>
            <div className="text-sm font-extrabold text-ink">Testimonials</div>
            <div className="text-[11px] font-semibold text-ink/60">
              WhatsApp-style reviews (hover to pause)
            </div>
          </div>
          <div className="text-[11px] font-extrabold text-brand-700">
            {items.length}+ reviews
          </div>
        </div>

        <div className="clo-testimonial-wrap relative h-[380px] overflow-hidden p-4">
          <div className="clo-testimonial-track" style={{ animationDuration: `${durationSec}s` }}>
            {normalized.map((t, idx) => {
              const right = t.side === "right";
              return (
                <div key={idx} className={"flex " + (right ? "justify-end" : "justify-start")}>
                  <div
                    className={
                      "max-w-[86%] rounded-2xl border px-3 py-2 text-sm shadow-[0_10px_24px_rgba(0,0,0,0.06)] " +
                      (right
                        ? "border-brand-700/10 bg-[#dcf8c6] text-ink"
                        : "border-brand-700/10 bg-white text-ink")
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[11px] font-extrabold text-brand-700">{t.name}</div>
                      <div className="rounded-full border border-brand-700/15 bg-white/70 px-2 py-[2px] text-[10px] font-extrabold text-ink/70">
                        {t.service}
                      </div>
                    </div>

                    <div className="mt-1 whitespace-pre-wrap text-ink/85">{t.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .clo-testimonial-track {
          display: flex;
          flex-direction: column;
          gap: 12px;
          will-change: transform;
          animation-name: cloTestimonialsScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .clo-testimonial-wrap:hover .clo-testimonial-track {
          animation-play-state: paused;
        }
        @keyframes cloTestimonialsScroll {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}