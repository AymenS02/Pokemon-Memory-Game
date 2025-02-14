// counter.js
import { useState, useEffect } from 'react';

export function useCounter(initialTimer = 15) {
  const [count, setCount] = useState(0);
  const [bestCount, setBestCount] = useState(0);
  const [timer, setTimer] = useState(initialTimer);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setStart(false);
      alert("Time's up!");
      setTimer(-1);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, start]);

  const resetCounter = () => {
    setCount(0);
    setTimer(initialTimer);
    setStart(false);
  };

  return {
    count,
    setCount,
    bestCount,
    setBestCount,
    timer,
    setTimer,
    start,
    setStart,
    resetCounter,
  };
}