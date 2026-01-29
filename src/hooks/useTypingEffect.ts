import { useState, useEffect } from "react";

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export const useTypingEffect = ({ text, speed = 80, delay = 0 }: UseTypingEffectOptions) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return { displayedText, isComplete };
};
