"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  })
    .format(date)
    .toLowerCase()
    .replace(" ", ""); // "5:38 PM" -> "5:38pm"
}

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));

    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000 * 30); // refresh every 30s, cheap and smooth enough

    return () => clearInterval(interval);
  }, []);

  // avoid hydration mismatch — render nothing until client mounts
  if (!time) return null;

  return (
    <span className="text-sm font-normal tracking-wide text-muted-foreground py-1">
      <span className="font-medium text-foreground/80">{time}</span> in
      Bengaluru, India
    </span>
  );
}
