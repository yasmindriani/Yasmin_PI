"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DownloadPage() {
  const router = useRouter();
  const [photostripUrl, setPhotostripUrl] = useState<string | null>(null);

  useEffect(() => {
    const dataUrl = sessionStorage.getItem("finalPhotostrip");
    if (dataUrl) {
      setPhotostripUrl(dataUrl);
    }
  }, []);

  const handleDownload = async () => {
    if (!photostripUrl) return;

    const isIos = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const link = document.createElement("a");
    const supportsDownload = "download" in link;

    if (!supportsDownload || isIos) {
      window.open(photostripUrl, "_blank");
      return;
    }

    try {
      const response = await fetch(photostripUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "berriebooth_photostrip.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed, opening image in new tab", error);
      window.open(photostripUrl, "_blank");
    }
  };

  return (
    <div className="choice-page">
      <div className="choice-card-large" style={{ 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "40px",
        gap: "30px",
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        zIndex: 10
      }}>
        {/* Decorative Corners */}
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", width: "100%" }}>
          {/* Photostrip container */}
          <div style={{ 
            transform: "rotate(-3deg)", 
            filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.2))",
            position: "relative",
            zIndex: 10
          }}>
            {photostripUrl ? (
              <img 
                src={photostripUrl} 
                alt="Your Photostrip" 
                style={{ 
                  maxHeight: "62vh", 
                  objectFit: "contain",
                  display: "block"
                }} 
              />
            ) : (
              <div style={{ width: "300px", height: "450px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5" }}>
                Loading...
              </div>
            )}
            
            {/* Text/Arrow positioned absolutely relative to the frame so it floats on the right */}
            <div style={{ 
              position: "absolute",
              top: "20%",
              right: "-260px",
              display: "flex", 
              flexDirection: "column", 
              alignItems: "flex-start",
              fontFamily: "var(--font-body)",
              fontWeight: "bold",
              fontSize: "1.5rem",
              transform: "rotate(5deg)",
              width: "240px",
              zIndex: 20
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Arrow */}
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(20deg)" }}>
                  <path d="M90 10 C 90 50, 50 80, 10 50" stroke="black" strokeWidth="4" fill="transparent" />
                  <path d="M10 50 L 30 40 M10 50 L 30 70" stroke="black" strokeWidth="4" />
                </svg>
                <div style={{ color: "#4a3454" }}>
                  <div>your</div>
                  <div>photostrip</div>
                  <div>is ready!</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Row */}
        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px" }}>
          <div style={{ position: "absolute", left: "20px" }}>
            <button
              className="back-btn"
              onClick={() => router.back()}
              aria-label="Go back"
              style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: 0 }}
            >
              <Image
                src={encodeURI("/images/arrow back.png")}
                alt="Back"
                width={40}
                height={40}
              />
            </button>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <button 
              className="frame-continue-btn" 
              onClick={handleDownload}
              style={{ padding: "12px 32px", fontSize: "1.2rem", backgroundColor: "#e0f2fe" }}
            >
              Download
            </button>
            <button 
              className="frame-continue-btn" 
              onClick={() => router.push("/")}
              style={{ padding: "12px 32px", fontSize: "1.2rem", backgroundColor: "#e0f2fe" }}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
