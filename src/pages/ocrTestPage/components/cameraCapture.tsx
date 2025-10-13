import React, { useState, useRef } from "react";

const CameraCapture: React.FC<{ onCapture: (image: string) => void }> = ({
  onCapture,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // buka kamera
  const openCamera = async () => {
    setIsOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCapturing(true);
    } catch (err) {
      alert("Gagal membuka kamera. Pastikan izin kamera diaktifkan.");
      setIsOpen(false);
    }
  };

  // ambil gambar dari video
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setPhoto(imageData);
      onCapture(imageData);
    }
  };

  // tutup kamera dan stop stream
  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsOpen(false);
    setIsCapturing(false);
    setPhoto(null);
  };

  return (
    <div className="flex flex-col items-center">
      {/* tombol buka kamera */}
      <button
        onClick={openCamera}
        className="flex-1 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
      >
        Buka Kamera
      </button>

      {/* modal pop-up kamera */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 w-[90%] max-w-md shadow-xl flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Ambil Gambar
            </h2>

            {isCapturing && !photo && (
              <video
                ref={videoRef}
                className="w-full rounded-lg"
                autoPlay
                playsInline
              />
            )}

            <canvas ref={canvasRef} className="hidden" />

            {photo && (
              <img
                src={photo}
                alt="Captured"
                className="w-full rounded-lg border border-gray-200"
              />
            )}

            <div className="flex justify-between mt-3">
              {!photo ? (
                <button
                  onClick={capturePhoto}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Ambil Foto
                </button>
              ) : (
                <button
                  onClick={() => setPhoto(null)}
                  className="flex-1 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Ulangi
                </button>
              )}
              <button
                onClick={closeCamera}
                className="flex-1 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 ml-2"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
