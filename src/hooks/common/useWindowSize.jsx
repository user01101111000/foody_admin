import { useEffect, useState } from "react";

function getWindowSize() {
  const { innerHeight: height, innerWidth: width } = window;
  return { width, height };
}

function useThrottle(callback, delay) {
  let timeoutId;
  return (...args) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        callback(...args);
        timeoutId = null;
      }, delay);
    }
  };
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", useThrottle(handleResize, 500));
    return () =>
      window.removeEventListener("resize", useThrottle(handleResize, 500));
  }, []);

  return windowSize;
}
