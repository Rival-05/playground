"use client";

import { useSyncExternalStore } from "react";

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

let currentTime = formatTime(new Date());
let clockStarted = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!clockStarted) {
    clockStarted = true;
    setInterval(() => {
      currentTime = formatTime(new Date());
      listeners.forEach((listener) => listener());
    }, 1000 * 30);
  }

  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentTime;
}

function getServerSnapshot() {
  return "";
}

export default function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!time) return null;

  return (
    <span className="text-muted-foreground py-1">
      <span className="text-foreground/80">{time}</span>{" "}
      <span className="font-light">in Bengaluru, India</span>
    </span>
  );
}
