import React from "react";
import { type Upload } from "@src/models/index";
import {
  IconScan,
  IconManualReading,
  IconClock,
} from "@src/components/icons/index";

interface ValidationCardProps {
  upload: Upload;
  onClick: () => void;
}

export const ValidationCard: React.FC<ValidationCardProps> = ({
  upload,
  onClick,
}) => (
  <div
    className="bg-white rounded-xl shadow-lg p-4 flex space-x-6 hover:shadow-xl hover:ring-2 hover:ring-sky-500 transition-all cursor-pointer"
    onClick={onClick}
  >
    <div className="flex-shrink-0">
      <img
        src={upload.file_path}
        alt={`Preview for ${upload.nosbg}`}
        className="w-32 h-24 object-cover rounded-md bg-slate-100"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-lg text-slate-800 truncate">
        {upload.nosbg}
      </p>
      <div className="mt-2 space-y-2 text-sm text-slate-600">
        <div className="flex items-center space-x-2">
          <IconScan />
          <span className="truncate">
            OCR:{" "}
            <span className="font-medium text-slate-800">
              {upload.hasil_ocr || "-"}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <IconManualReading />
          <span className="truncate">
            Bacaan:{" "}
            <span className="font-bold text-sky-600">
              {upload.hasil_bacaan || "-"}
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <IconClock />
          <span className="truncate">
            {new Date(upload.uploaded_at).toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  </div>
);
