import { useState, useEffect, useCallback } from "react";

interface UseWorkoutTimerProps {
  onComplete: () => void;
  initialTime?: number;
}

export const useWorkoutTimer = ({ onComplete, initialTime = 60 }: UseWorkoutTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const start = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setTimeLeft(initialTime);
    setTotalTime(0);
  }, [initialTime]);

  const reset = useCallback(() => {
    setTimeLeft(initialTime);
    setIsPlaying(false);
  }, [initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            onComplete();
            return initialTime;
          }
          return prev - 1;
        });
        setTotalTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, timeLeft, onComplete, initialTime]);

  return {
    timeLeft,
    isPlaying,
    totalTime,
    start,
    pause,
    stop,
    reset,
  };
};