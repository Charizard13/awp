"use client";
import usePwa from "@/hooks/usePwa";

export default function Pwa() {
  const { prompt, install } = usePwa();
  console.log({ prompt, install });
  return (
    <div className="fixed bottom-0 right-0 flex flex-col gap-2 p-4">
      {prompt && (
        <button className="bg-btn-background hover:bg-btn-background-hover text-foreground rounded-md px-4 py-2" onClick={install}>
          Install App
        </button>
      )}
    </div>
  );
}
