import React from "react";
import loginImage from "@src/assets/images/login-img.webp";

export const LoginVisualPanel: React.FC = () => (
  <div className="hidden md:block w-1/2 relative">
    <img
      src={loginImage}
      alt="Bali Water System"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-10 text-white">
      <h1 className="text-4xl font-bold leading-tight mb-4">
        Tirta Amerta Bhuwana
      </h1>
      <p className="text-lg">
        Mengalirkan Kehidupan, Menjaga Warisan. Sistem Manajemen Air Terpadu
        Pulau Dewata.
      </p>
    </div>
  </div>
);
