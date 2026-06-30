"use client"; // Wajib kalau pakai Next.js App Router (folder app)
import { useState } from "react";

export default function Photobooth() {
  // 1. State untuk menyimpan foto yang diambil dan frame yang dipilih
  const [userPhoto, setUserPhoto] = useState("/images/berrie home 1.png"); // ganti dengan source foto asli nanti
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  // 2. Daftar list frame kamu (sesuaikan dengan file di folder public)
  const listFrame = [
    { id: 1, src: "/images/frame single.png" },
    { id: 2, src: "/images/frame single deer.png" },
    { id: 3, src: "/images/frame single green star.png" },
  ];

  return (
    <div className="flex gap-8 p-8 justify-center items-center bg-[#fefae0]">
      {/* ================= SEBELAH KIRI: AREA PREVIEW FOTO ================= */}
      <div className="relative w-[350px] h-[450px] overflow-hidden rounded-lg shadow-lg border border-gray-300">
        {/* Layer 1: Frame (Paling Belakang) */}
        {selectedFrame && (
          <img
            src={encodeURI(selectedFrame)}
            alt="Frame Terpilih"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none z-10"
          />
        )}

        {/* Layer 2: Foto User (Di Atas Frame) */}
        <img
          src={userPhoto}
          alt="Foto Kamu"
          className="absolute top-0 left-0 w-full h-full object-cover z-20"
        />
      </div>

      {/* ================= SEBELAH KANAN: PILIHAN FRAME ================= */}
      <div className="w-[300px] bg-white p-4 rounded-xl shadow-md">
        <h3 className="font-bold mb-4 text-center">Pilih Frame</h3>

        <div className="grid grid-cols-3 gap-2">
          {listFrame.map((frame) => (
            <button
              key={frame.id}
              onClick={() => setSelectedFrame(frame.src)} // Saat diklik, ganti frame di sebelah kiri
              className={`border-2 p-1 rounded-md transition-all ${
                selectedFrame === frame.src
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
                <img src={encodeURI(frame.src)} alt="Pilihan" className="w-full h-auto" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
