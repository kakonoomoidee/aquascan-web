import React from "react";

const IconRole: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" ry="2" />
    <circle cx="8" cy="10" r="2" />
    <path d="M12 14h6" />
    <path d="M12 10h6" />
  </svg>
);
export default IconRole;
