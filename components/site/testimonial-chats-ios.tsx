"use client";

import * as React from "react";

export type ChatTestimonial = {
  id?: number | string;
  customerName: string;
  service: string;
  customerText: string;
  ourReply: string;
};

export function TestimonialChatsIOS({ items }: { items: ChatTestimonial[] }) {
  const list = React.useMemo(() => {
    const base = (items || []).filter(Boolean);
    return [...base, ...base]; // duplicate to loop smoothly
  }, [items]);

  // premium slow scroll
  const durationSec = Math.max(35, Math.min(140, (items?.length || 1) * 1.6));

  return (
    <div className="relative">
      <div className="clo-marquee relative overflow-hidden py-2">
        {/* edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white/95 via-white/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white/95 via-white/60 to-transparent" />

        <div className="px-2">
          <div
            className="clo-track flex gap-4"
            style={{ animationDuration: `${durationSec}s` }}
          >
            {list.map((t, idx) => (
              <div
                key={idx}
                className="w-[280px] shrink-0 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
              >
                {/* iOS-like mini header */}
                <div className="flex items-center justify-between gap-3 border-b border-black/5 bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-200 to-brand-500/40 border border-brand-700/15" />
                    <div className="leading-tight">
                      <div className="text-xs font-extrabold text-ink">{t.customerName}</div>
                      <div className="text-[10px] font-semibold text-ink/55">{t.service}</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-extrabold text-ink/45">now</div>
                </div>

                {/* chat area */}
                <div className="bg-[#f2f2f7] p-4">
                  {/* customer bubble */}
                  <div className="flex justify-start">
                    <div className="max-w-[92%] rounded-[18px] rounded-bl-[6px] bg-[#e5e5ea] px-3 py-2 text-[13px] font-semibold text-black/85">
                      {t.customerText}
                    </div>
                  </div>

                  <div className="h-2" />

                  {/* our reply bubble */}
                  <div className="flex justify-end">
                    <div className="max-w-[92%] rounded-[18px] rounded-br-[6px] bg-[#007aff] px-3 py-2 text-[13px] font-semibold text-white">
                      {t.ourReply}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .clo-track {
            will-change: transform;
            animation-name: cloMarquee;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          .clo-marquee:hover .clo-track {
            animation-play-state: paused;
          }
          @keyframes cloMarquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .clo-track {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}