"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function RetakePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const frameId = params.id as string;
  const [photos, setPhotos] = useState<string[]>([]);

  const frameImages: Record<string, string> = {
    single: "/images/single frame polos (1).png?v=3",
    double: "/images/double frame polos (1).png?v=3",
    triplet: "/images/triple frame polos (1).png?v=3",
  };

  const photoCount: Record<string, number> = {
    single: 1,
    double: 2,
    triplet: 3,
  };

  useEffect(() => {
    const photosParam = sessionStorage.getItem("capturedPhotos");
    if (photosParam) {
      try {
        setPhotos(JSON.parse(photosParam));
      } catch (e) {
        console.error("Failed to parse photos", e);
      }
    }
  }, []);

  const handleRetake = () => {
    const source = searchParams.get("source");
    if (source === "upload") {
      document.getElementById("retakeFileInput")?.click();
    } else {
      const filterId = searchParams.get("filter") || "normal";
      router.push(`/capture/${frameId}/camera?filter=${filterId}`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const base64Photos = [...photos];
    // Find the first empty slot or just start from 0 if we want to replace?
    // User said "bukan malah satu foto doang", suggesting they want to fill or add.
    // Let's find the first empty index.
    let firstEmpty = base64Photos.findIndex((p) => !p);
    if (firstEmpty === -1) firstEmpty = 0; // If all full, start over

    for (
      let i = 0;
      i < files.length && firstEmpty + i < photoCount[frameId];
      i++
    ) {
      const file = files[i];
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new window.Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 1080;
            const MAX_HEIGHT = 1080;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.7));
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
      base64Photos[firstEmpty + i] = base64;
    }

    setPhotos(base64Photos);
    sessionStorage.setItem("capturedPhotos", JSON.stringify(base64Photos));
  };

  const handleContinue = () => {
    router.push(`/capture/${frameId}/color`);
  };

  return (
    <div className="choice-page">
      <div className="choice-card-large">
        {/* Decorative Corners */}
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>
        <div className="border-t"></div>

        <div className="capture-container">
          <div
            className={`capture-frame-wrapper frame-${frameId} is-classic retake-frame-active`}
            style={{
              transform: "rotate(-3deg)",
              position: "relative",
              backgroundColor: "#ffffff",
            }}
          >
          {/* Photos BELOW frame lines */}
            <div className="camera-overlay-container" style={{ zIndex: 20 }}>
              {Array.from({ length: photoCount[frameId] }).map((_, i) => (
                <div key={i} className="camera-preview-box">
                  {photos[i] && (
                    <img
                      src={photos[i]}
                      alt={`Captured ${i}`}
                      className="camera-preview-video"
                      style={{ transform: "none" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <button className="retake-btn" onClick={handleRetake}>
              <img
                src={encodeURI("/images/retake-icon.png")}
                alt=""
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span>
                {searchParams.get("source") === "upload" ? "upload" : "retake"}
              </span>
            </button>
            <input
              type="file"
              id="retakeFileInput"
              hidden
              accept="image/*"
              multiple
              onChange={handleFileUpload}
            />
            <button
              className="start-capture-btn"
              onClick={handleContinue}
              style={{ marginTop: "20px" }}
            >
              continue
            </button>
          </div>
        </div>

        <div className="back-button-overlay">
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
        </div>
      </div>
    </div>
  );
}
