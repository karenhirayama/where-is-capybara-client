import type { TimeTaken } from "../interfaces/interfaces";

export   const getTotalSeconds = (time: TimeTaken): number => {
    const hours = time.hours || 0;
    const minutes = time.minutes || 0;
    const seconds = time.seconds || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };