"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.timezone,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 10_000);
  return () => clearInterval(id);
}

// Stable within a given minute, so React's Object.is check stays quiet.
const getSnapshot = () => formatter.format(new Date());

/** Live clock in the author's timezone. Renders a placeholder until hydrated. */
export default function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, () => null);

  return (
    <p className="font-mono text-xs text-faint">
      local time:{" "}
      <span className="tabular-nums text-muted">{time ?? "--:--"}</span>
    </p>
  );
}
