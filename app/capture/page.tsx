"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type FrameId = "single" | "double" | "triplet";

const FRAMES: { id: FrameId; src: string; label: string }[] = [
  { id: "single", src: "/images/single frame polos.png", label: "1 Photo" },
  { id: "double", src: "/images/double frame polos.png", label: "2 Photos" },
  { id: "triplet", src: "/images/triple frame polos.png", label: "3 Photos" },
];

export default function CapturePage() {
  const [selected, setSelected] = useState<FrameId>("double");
  const router = useRouter();

  return (
    <div className="frame-page">
      <div className="frame-card">
        <h1 className="frame-title">Pick your frame</h1>

        <div className="frame-options">
          {FRAMES.map((f) => (
            <button
              key={f.id}
              className={`frame-option${selected === f.id ? " frame-selected" : ""}`}
              onClick={() => setSelected(f.id)}
              aria-label={`Select ${f.label} frame`}
            >
              <div className="frame-img-wrapper">
                <Image
                  src={f.src}
                  alt={f.label}
                  width={240}
                  height={360}
                  className="frame-img"
                  priority
                />
              </div>
            </button>
          ))}
        </div>

        <div className="frame-bottom">
          <button
            className="back-btn"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <Image
              src={encodeURI("/images/arrow back.png")}
              alt="Back"
              width={40}
              height={40}
            />
          </button>
          <button
            className="frame-continue-btn"
            onClick={() => router.push(`/capture/${selected}`)}
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
}
