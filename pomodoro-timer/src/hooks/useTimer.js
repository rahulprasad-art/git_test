import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialDuration, onComplete) {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(initialDuration);

  // Update timer when initial duration changes (e.g., mode switch)
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(initialDuration);
      pausedTimeRef.current = initialDuration;
    }
  }, [initialDuration, isRunning]);

  // Timer countdown logic
  useEffect(() => {
    if (isRunning && !isPaused) {
      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;

          if (newTime <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsPaused(false);
            if (onComplete) onComplete();
            return 0;
          }

          pausedTimeRef.current = newTime;
          return newTime;
        });
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isRunning, isPaused, onComplete]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(initialDuration);
    pausedTimeRef.current = initialDuration;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [initialDuration]);

  const skip = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (onComplete) onComplete();
  }, [onComplete]);

  return {
    timeLeft,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    reset,
    skip,
  };
}
