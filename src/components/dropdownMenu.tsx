import React, { useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDetectOutsideClick } from "@src/hooks/index";

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom";
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  position = "bottom",
}) => {
  const { triggerRef, nodeRef, isActive, setIsActive } =
    useDetectOutsideClick(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (isActive && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const menuHeight = 80;
      const menuWidth = 160;
      const topPos =
        position === "top"
          ? rect.top + window.scrollY - menuHeight
          : rect.bottom + window.scrollY + 8;
      const leftPos = rect.right + window.scrollX - menuWidth;

      setCoords({ top: topPos, left: leftPos });
    }
  }, [isActive, position, triggerRef]);

  return (
    <>
      <button ref={triggerRef} onClick={() => setIsActive(!isActive)}>
        {trigger}
      </button>

      {isActive &&
        createPortal(
          <div
            ref={nodeRef}
            className="fixed w-40 rounded-md shadow-xl bg-white border border-slate-200 z-50"
            style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          >
            <div className="py-1" onClick={() => setIsActive(false)}>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
