import React, { useEffect, useRef, useState } from "react";
import "./TextType.css";

const TextType = ({
  text,
  speed = 42,
  initialDelay = 0,
  start = true,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const timeoutRef = useRef(null);
  const completeCalledRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!start) return undefined;

    setDisplayedText("");
    completeCalledRef.current = false;

    let cancelled = false;
    const sourceText = typeof text === "string" ? text : "";

    const typeAt = (index) => {
      if (cancelled) return;
      setDisplayedText(sourceText.slice(0, index));

      if (index > sourceText.length) {
        if (!completeCalledRef.current) {
          completeCalledRef.current = true;
          onCompleteRef.current?.();
        }
        return;
      }

      timeoutRef.current = setTimeout(() => typeAt(index + 1), speed);
    };

    timeoutRef.current = setTimeout(() => typeAt(1), initialDelay);

    return () => {
      cancelled = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, initialDelay, start]);

  return (
    <span className={`text-type ${className}`.trim()}>
      <span className="text-type-content">{displayedText}</span>
      {showCursor && <span className="text-type-cursor">{cursorCharacter}</span>}
    </span>
  );
};

export default TextType;
