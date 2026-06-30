"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type FilterId = "normal" | "bw" | "retro" | "soft";

export default function FilterPage() {
  const router = useRouter();
  const params = useParams();
  const frameId = params.id;
  const [selectedFilter, setSelectedFilter] = useState<FilterId>("normal");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const filters: { id: FilterId; label: string; class: string }[] = [
    { id: "normal", label: "Normal", class: "filter-normal" },
    { id: "retro", label: "Retro", class: "filter-retro" },
    { id: "soft", label: "Soft Focus", class: "filter-soft" },
    { id: "bw", label: "Black & White", class: "filter-bw" },
  ];

  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
          audio: false,
        });
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // When stream changes, update all video elements
  // We use multiple video elements for the previews
  const VideoPreview = ({ filterClass }: { filterClass: string }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (localVideoRef.current && stream) {
        localVideoRef.current.srcObject = stream;
      }
    }, [stream]);

    return (
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        className={`filter-video ${filterClass}`}
      />
    );
  };

  return (
    <div className="choice-page">
      <div className="choice-card filter-card">
        {/* Decorative Corners */}
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>

        <div className="border-t"></div>

        <h1 className="filter-title">Choose a filter</h1>

        <div className="filter-grid">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-option ${selectedFilter === filter.id ? "filter-selected" : ""}`}
              onClick={() => setSelectedFilter(filter.id)}
            >
              <div className="filter-preview-container">
                <VideoPreview filterClass={filter.class} />
              </div>
              <span className="filter-label">{filter.label}</span>
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
            onClick={() =>
              router.push(`/capture/${frameId}/camera?filter=${selectedFilter}`)
            }
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
}
