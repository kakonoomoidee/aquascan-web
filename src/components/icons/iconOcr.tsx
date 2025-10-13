import React from "react";

const IconOcr: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 3H4a1 1 0 0 0-1 1v3" />
    <path d="M21 3h-3" />
    <path d="M21 12v-1" />
    <path d="M3 12v1" />
    <path d="M7 21H4a1 1 0 0 1-1-1v-3" />
    <path d="M17 21h3a1 1 0 0 0 1-1v-3" />
    <path d="M12 7v10" />
    <path d="M9 7h6" />
  </svg>
);

export default IconOcr;
