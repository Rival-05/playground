"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVisitor() {
      try {
        const res = await fetch("/api/visitor", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed request");

        const data = await res.json();

        setMessage(data.message ? data.message + " visitor." : null);
      } catch (err: any) {
        if (err.name !== "AbortError") {
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
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between px-2 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            {currentYear}
            <Link
              href="https://x.com/Rival_o5"
              className="font-medium text-primary link-underline"
            >
              Rajat Tripathi
            </Link>
            <span>All rights reserved.</span>
          </div>

          <span className="flex items-center gap-1">
            Inspired by
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary link-underline"
            >
              ui.shadcn.com
            </Link>
            and
            <Link
              href="https://x.com/iamncdai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary link-underline"
            >
              ncdai
            </Link>
          </span>
        </div>

        <div>
          {!loading && !error && message && (
            <h3 className="flex gap-1 text-muted-foreground">
              You're the{" "}
              <span className="font-medium text-foreground">{message}</span>
            </h3>
          )}
        </div>
      </div>
    </Reveal>
  );
}
