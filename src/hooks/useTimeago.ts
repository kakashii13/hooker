import { useState, useEffect } from "react";
const DATE_UNIT = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp: number) => {
  const now = Date.now();
  const elapsed = (timestamp - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNIT) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "seconds") {
      const value = Math.floor(elapsed / +secondsInUnit);
      if (value && unit) return { value, unit };
    }
  }
};

export const useTimeago = (timestamp: number) => {
  const [timeago, setTimeago] = useState(getDateDiffs(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeago = getDateDiffs(timestamp);
      setTimeago(newTimeago);
    }, 15000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" });
  // solucionar esto 🤔
  const { value, unit } = timeago;

  return rtf.format(value, unit);
};
