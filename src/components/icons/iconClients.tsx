import React from "react";

const IconClients: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
    <path d="M12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
  </svg>
);

export default IconClients;
