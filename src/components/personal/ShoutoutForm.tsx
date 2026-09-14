"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ArrowLeft from "@/components/svgs/arrowleft";

type Step = "message" | "handle" | "done";

export default function ShoutoutForm() {
  const [step, setStep] = useState<Step>("message");
  const [message, setMessage] = useState("");
  const [handle, setHandle] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submittingRef = useRef(false);

  useEffect(() => {
    if (step !== "done") return;

    const timeoutId = window.setTimeout(() => {
      setMessage("");
      setHandle("");
      setHoneypot("");
      setError(null);
      setStep("message");
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [step]);

  async function handleSubmit() {
    if (!message.trim() || submittingRef.current) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/shoutout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, handle, company: honeypot }),
      });

      if (res.status === 429) {
        setError("You've already sent one recently — try again in a bit.");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to send");
      }

      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  function handleMessageKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && message.trim()) {
      event.preventDefault();
      setError(null);
      setStep("handle");
    }
  }

  function handleHandleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !isSubmitting) {
      event.preventDefault();
      void handleSubmit();
    }
  }

  function goBackToMessage() {
    setError(null);
    setStep("message");
  }

  if (step === "done") {
    return (
      <div className="py-2 md:py-4 text-sm font-light text-muted-foreground">
        ~ thanks for that.
      </div>
    );
  }

  return (
    <div className="py-2 md:py-4">
      <div className="flex items-center gap-2 text-sm text-foreground/80">
        {step === "message" ? (
          <>
            <span className="shrink-0">~ liked the content?</span>
            <div className="relative min-w-0 flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleMessageKeyDown}
                placeholder="leave a thought..."
                maxLength={500}
                autoFocus
                className="min-w-0 w-full border-b border-border/60 bg-transparent px-1 py-1 pr-7 font-light text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-foreground/50"
              />
              <button
                type="button"
                aria-label="Clear comment"
                title="Clear comment"
                onClick={() => setMessage("")}
                className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              aria-label="Edit comment"
              title="Edit comment"
              onClick={goBackToMessage}
              disabled={isSubmitting}
              className="shrink-0 p-1 cursor-pointer text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none disabled:opacity-60"
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <span className="shrink-0">who are you?</span>
            <div className="relative min-w-0 flex-1">
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                onKeyDown={handleHandleKeyDown}
                placeholder="@twitter handle or your name"
                maxLength={120}
                autoFocus
                disabled={isSubmitting}
                className="min-w-0 w-full border-b border-border/60 bg-transparent px-1 py-1 pr-7 font-light text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-foreground/50 disabled:opacity-60"
              />
              <button
                type="button"
                aria-label="Clear name"
                title="Clear name"
                onClick={() => setHandle("")}
                disabled={isSubmitting}
                className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none disabled:opacity-60"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Honeypot: hidden from real users, bots tend to fill every field */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {error && (
        <p className="mt-1.5 text-xs font-light text-destructive">{error}</p>
      )}
    </div>
  );
}
