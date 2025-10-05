import { useState, useEffect, useRef } from "react";

export const useDetectOutsideClick = (initialState: boolean) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current?.contains(event.target as Node)) {
        return;
      }
      if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return { triggerRef, nodeRef, isActive, setIsActive };
};
