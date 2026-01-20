// ...existing code...
import React from "react";

export default function MoneyButton() {
  return (
    <button
      className="
        relative inline-flex items-center justify-center select-none
        px-4 py-2 rounded-xl font-bold text-black
        bg-linear-to-b from-amber-300 to-amber-500
        ring-1 ring-amber-200/70
        shadow-[0_6px_0_#a16207,0_10px_20px_rgba(0,0,0,.35)]
        transition-all duration-200 ease-out
        hover:-translate-y-0.5
        hover:shadow-[0_8px_0_#a16207,0_16px_24px_rgba(0,0,0,.45)]
        hover:brightness-110
        active:translate-y-1
        active:shadow-[0_2px_0_#a16207,0_6px_12px_rgba(0,0,0,.3)]
        before:content-[''] before:absolute before:inset-0 before:rounded-xl
        before:shadow-[inset_0_2px_3px_rgba(255,255,255,.75),inset_0_-2px_3px_rgba(0,0,0,.2)]
        after:content-[''] after:absolute after:top-0.5 after:left-1 after:right-1 after:h-1/3 after:rounded-t-xl   
        after:bg-[linear-gradient(to_bottom,rgba(255,255,255,.6),rgba(255,255,255,0))]
        after:pointer-events-none
        hover:cursor-pointer
      "
    >
      Rp 50.000
    </button>
  );
}
// ...existing code...