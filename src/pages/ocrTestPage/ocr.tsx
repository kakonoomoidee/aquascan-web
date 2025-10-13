import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "@src/components";
import { useOcr } from "@src/hooks";
import { type Customer } from "@src/models";
import Swal from "sweetalert2";

// -------------------- Kamera Component --------------------
const CameraCapture: React.FC<{
  onCapture: (file: File) => void;
  onClose: () => void;
}> = ({ onCapture, onClose }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  React.useEffect(() => {
    const initCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error(err);
        Swal.fire(
          "Akses Kamera Ditolak",
          "Tidak bisa mengakses kamera",
          "error"
        );
        onClose();
      }
    };

    initCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const handleCapture = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        onCapture(file);
        handleClose(); // ✅ matikan kamera juga saat capture selesai
      }
    }, "image/jpeg");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md flex flex-col items-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-lg w-full"
        />
        <canvas ref={canvasRef} className="hidden" />
        <div className="mt-4 flex gap-3 w-full">
          <button
            onClick={handleCapture}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Ambil Foto
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------- Skeleton --------------------
const OcrResultSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
    <div className="h-8 bg-slate-200 rounded w-3/4"></div>
    <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
    <div className="h-8 bg-slate-200 rounded w-1/2"></div>
    <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
    <div className="h-12 bg-slate-200 rounded w-full"></div>
    <div className="h-12 bg-green-200 rounded-lg mt-4"></div>
  </div>
);

// -------------------- Main OCR Client --------------------
const OcrClient: React.FC = () => {
  const { nosbg } = useParams<{ nosbg: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const customer: Customer = location.state?.customer;

  const { processOcr, isProcessingOcr, submitReading, isSubmitting } = useOcr();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [editedReading, setEditedReading] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      handleOcrProcess(file);
    }
  };

  const handleOcrProcess = async (file: File) => {
    if (!nosbg) return;
    try {
      const result = await processOcr({ nosbg, photo: file });
      setOcrResult(result);
      setEditedReading(result.hasil_ocr);
    } catch (err) {
      console.error(err);
      Swal.fire(
        "OCR Gagal",
        "Gagal memproses gambar, silakan coba lagi.",
        "error"
      );
    }
  };

  const handleSubmit = async () => {
    if (!ocrResult) return;
    try {
      await submitReading({
        upload_id: ocrResult.id,
        hasil_bacaan: editedReading,
      });
      await Swal.fire("Berhasil!", "Data bacaan berhasil disubmit.", "success");
      navigate("/ocr-test");
    } catch (err) {
      console.error(err);
      Swal.fire("Submit Gagal", "Gagal menyimpan data bacaan.", "error");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-1">
          Tes Baca Meteran
        </h1>
        <p className="text-slate-500 mb-6">
          Untuk Pelanggan:{" "}
          <span className="font-semibold">{customer?.nama?.trim()}</span> (
          {nosbg})
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ================= LEFT SIDE ================= */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-[50vh] w-auto rounded-md"
              />
            ) : (
              <div className="text-center p-10 border-2 border-dashed border-slate-300 rounded-lg w-full">
                <p className="text-slate-500">
                  Pilih file gambar atau buka kamera
                </p>
              </div>
            )}

            <div className="mt-6 w-full flex gap-4">
              <label
                htmlFor="file-upload"
                className="flex-1 text-center cursor-pointer py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition"
              >
                Pilih File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={() => setIsCameraOpen(true)}
                className="flex-1 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
              >
                Buka Kamera
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Hasil Pembacaan
            </h2>

            {isProcessingOcr && <OcrResultSkeleton />}

            {ocrResult && !isProcessingOcr && (
              <div className="space-y-6">
                <div>
                  <label className="font-medium text-slate-500">No. SBG</label>
                  <p className="text-lg font-mono bg-slate-100 p-2 rounded">
                    {ocrResult.nosbg}
                  </p>
                </div>
                <div>
                  <label className="font-medium text-slate-500">Status</label>
                  <p className="text-lg font-mono bg-slate-100 p-2 rounded capitalize">
                    {ocrResult.status}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="hasil-bacaan"
                    className="font-medium text-slate-500"
                  >
                    Hasil Bacaan (Bisa Diedit)
                  </label>
                  <input
                    id="hasil-bacaan"
                    type="text"
                    value={editedReading}
                    onChange={(e) => setEditedReading(e.target.value)}
                    className="w-full text-2xl font-bold font-mono bg-yellow-100 border border-yellow-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Submit Bacaan"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {isCameraOpen && (
        <CameraCapture
          onCapture={(file) => {
            setPreviewUrl(URL.createObjectURL(file));
            handleOcrProcess(file);
          }}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </div>
  );
};

export default OcrClient;
