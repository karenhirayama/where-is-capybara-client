import type { TimeTaken } from "../interfaces/interfaces";

export   const formatTime = (time: TimeTaken): string => {
    const hours = time.hours || 0;
    const minutes = time.minutes || 0;
    const seconds = time.seconds || 0;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };