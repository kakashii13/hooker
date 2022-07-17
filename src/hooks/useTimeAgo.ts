import { formatDistanceStrict } from "date-fns";
import { useEffect, useState } from "react";

export const useTimeago = (createdAt: number = 0) => {
  const [timeago, setTimeago] = useState(
    formatDistanceStrict(Date.now(), createdAt)
  );

  useEffect(() => {
    const now = Date.now();
    const interval = setInterval(() => {
      const result = formatDistanceStrict(now, createdAt);
      setTimeago(result);
    }, 10000);

    return () => clearInterval(interval);
  }, [timeago]);

  return timeago;
};
