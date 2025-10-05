import React from "react";

interface ActivityItemProps {
  user: string;
  action: string;
  time: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  user,
  action,
  time,
}) => (
  <div className="flex items-start">
    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 mr-3"></div>
    <div>
      <p className="text-slate-600">
        <span className="font-semibold">{user}</span> {action}
      </p>
      <p className="text-xs text-slate-400">{time}</p>
    </div>
  </div>
);
