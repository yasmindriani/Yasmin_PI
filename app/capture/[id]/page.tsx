"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export default function UploadChoicePage() {
  const router = useRouter();
  const params = useParams();
  const frameId = params.id;
  const [previewSrc, setPreviewSrc] = useState<string>("/foto.jpg");

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const photoCount: Record<string, number> = {
      single: 1,
      double: 2,
      triplet: 3,
    };
    const maxPhotos = photoCount[frameId as string] || 1;
    const selectedCount = Math.min(files.length, maxPhotos);

    const base64Photos: string[] = [];
    for (let i = 0; i < selectedCount; i++) {
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
      if (i === 0) {
        setPreviewSrc(base64);
      }
      base64Photos.push(base64);
    }

    // Fill the rest with empty strings if fewer than maxPhotos were selected
    const finalPhotos = [...base64Photos];
    while (finalPhotos.length < maxPhotos) {
      finalPhotos.push("");
    }

    sessionStorage.setItem("capturedPhotos", JSON.stringify(finalPhotos));
    router.push(`/capture/${frameId}/retake?filter=normal&source=upload`);
  };

  return (
    <div className="choice-page">
      <div className="choice-card">
        {/* Decorative Corners */}
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>

        {/* Decorative Borders */}
        <div className="border-t"></div>

        <div
          className="choice-content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            width: "100%",
            height: "100%",
          }}
        >
          <button
            className="action-btn upload-photo-btn"
            onClick={() => router.push(`/capture/${frameId}/filter`)}
          >
            Take Photo
          </button>

          <button
            className="action-btn upload-photo-btn"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Upload Photo
          </button>
          <input
            type="file"
            id="fileInput"
            hidden
            accept="image/*"
            multiple={frameId !== "single"}
            onChange={handleFileUpload}
          />
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
