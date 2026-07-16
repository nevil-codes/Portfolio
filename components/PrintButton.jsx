"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="font-mono text-[13px] text-neutral-700 border border-neutral-300 rounded-md px-4 py-2 hover:border-neutral-900 hover:text-neutral-900 transition-colors bg-transparent cursor-pointer"
    >
      Print / Save as PDF
    </button>
  );
}
