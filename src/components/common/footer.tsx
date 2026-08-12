"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import LastUpdated from "@/components/LastUpdated";

export default function Footer({
  lastUpdatedDate,
}: {
  lastUpdatedDate: string;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVisitor() {
      try {
        const res = await fetch("/api/visitor", { signal: controller.signal });
        if (!res.ok) throw new Error("Failed request");
        const data = await res.json();
        setMessage(data.message ? data.message + " visitor" : null);
      } catch (err: unknown) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    loadVisitor();
    return () => controller.abort();
  }, []);

  return (
    <Reveal>
      <div className="mx-auto flex w-full max-w-3xl items-start justify-between px-2 py-6 text-sm text-muted-foreground sm:items-center">
        <div className="flex flex-col items-start gap-2">
          <LastUpdated date={lastUpdatedDate} />
        </div>
        <div>
          {!loading && !error && message && (
            <h3 className="flex gap-1 text-muted-foreground">
              You&apos;re the{" "}
              <span className="font-medium text-foreground/80">{message}</span>
            </h3>
          )}
        </div>
      </div>
    </Reveal>
  );
}
