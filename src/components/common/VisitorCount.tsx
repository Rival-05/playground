"use client";

import { useEffect, useState } from "react";

export default function VisitorCount() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVisitor() {
      try {
        const response = await fetch("/api/visitor", {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed request");

        const data = (await response.json()) as { message?: string };
        setMessage(data.message ? `${data.message} visitor` : null);
      } catch (error: unknown) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setMessage(null);
        }
      }
    }

    loadVisitor();
    return () => controller.abort();
  }, []);

  if (!message) return null;

  return (
    <h3 className="flex gap-1 text-muted-foreground">
      You&apos;re the <span className="font-medium text-foreground/80">{message}</span>
    </h3>
  );
}
