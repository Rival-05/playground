"use client";

import { useState } from "react";
import { SlotText } from "slot-text/react";
import Link from "next/link";
import "slot-text/style.css";

export default function Mail() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText("rivalo3.chat@gmail.com");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <Link
      onClick={handleClick}
      href="mailto:rivalo3.chat@gmail.com"
      className=" font-medium text-foreground/80"
    >
      <SlotText
        text={copied ? "Copied" : "mail me"}
        options={{
          direction: copied ? "up" : "down",
          color: copied ? "green" : undefined,
          duration: 300,
          exitOffset: 50,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          colorFade: 900,
          interrupt: false,
          stagger: 45,
        }}
      />
    </Link>
  );
}
