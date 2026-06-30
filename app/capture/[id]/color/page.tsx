"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";

export default function ColorPage() {
  const router = useRouter();
  const params = useParams();
  const frameId = params.id as string;
  const [photos, setPhotos] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("Color");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showUnavailablePopup, setShowUnavailablePopup] = useState(false);
  const [placedStickers, setPlacedStickers] = useState<{ id: string; src: string; x: number; y: number; width: number; height: number }[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (activeTab !== "Sticker") {
      setSelectedStickerId(null);
    }
  }, [activeTab]);

  const stickerImages = [
    "/images/stickers/black glasses.png",
    "/images/stickers/brown glasses.png",
    "/images/stickers/i love me sticker.png",
    "/images/stickers/polkadot glasses.png",
    "/images/stickers/red glasses.png",
    "/images/stickers/rosette blue brown.png",
    "/images/stickers/rosette blue pink.png",
    "/images/stickers/rosette green pink.png",
    "/images/stickers/star blue.png",
    "/images/stickers/star pink.png",
    "/images/stickers/star wand blue yellow.png",
    "/images/stickers/star wand green pink.png",
    "/images/stickers/star wand pink yellow.png",
    "/images/stickers/star yellow.png",
    "/images/stickers/whimsy crown circle.png",
    "/images/stickers/whimsy crown heart.png",
    "/images/stickers/whimsy crown star.png",
  ];

  const handleAddSticker = (src: string) => {
    const newSticker = {
      id: Date.now().toString(),
      src,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
    };
    setPlacedStickers([...placedStickers, newSticker]);
    setSelectedStickerId(newSticker.id);
  };

  const handleDeleteSticker = (id: string) => {
    setPlacedStickers(placedStickers.filter((s) => s.id !== id));
    if (selectedStickerId === id) {
      setSelectedStickerId(null);
    }
  };

  const frameImages: Record<string, string> = {
    single: "/images/single frame polos.png?v=3",
    double: "/images/double frame polos.png?v=5",
    triplet: "/images/triple frame polos.png?v=4",
  };

  const [selectedFrameStyle, setSelectedFrameStyle] = useState<string>(
    frameImages[frameId] || "/images/single frame polos.png?v=3",
  );

  // Classic frame is the blank/plain one — when non-classic frame is selected, Color tab is hidden
  const classicFrames = [
    "/images/single frame polos.png?v=3",
    "/images/double frame polos.png?v=5",
    "/images/triple frame polos.png?v=4",
  ];
  const isClassicFrame = classicFrames.includes(selectedFrameStyle);

  const photoCount: Record<string, number> = {
    single: 1,
    double: 2,
    triplet: 3,
  };

  const singleFrameStyles = [
    { name: "Classic", path: "/images/single frame polos.png?v=3" },
    { name: "Deer", path: "/images/frame single/frame single deer.png" },
    { name: "Green Star", path: "/images/frame single/frame single green star.png?v=2" },
    { name: "Polkadot", path: "/images/frame single/frame single polkadot.png" },
    { name: "Stripes", path: "/images/frame single/frame single stripes.png" },
    { name: "Valentines", path: "/images/frame single/frame single valentines.png" },
    { name: "Bohemian", path: "/images/frame single/frame single bohemian.png" },
    { name: "iPod", path: "/images/frame single/frame single ipod.png?v=2" },
  ];

  const doubleFrameStyles = [
    { name: "Classic", path: "/images/double frame polos.png?v=5" },
    { name: "Fancy Nancy", path: "/images/frame double/frame double fancy nancy.png?v=5" },
    { name: "Heart Chain", path: "/images/frame double/frame double heart chain.png?v=5" },
    { name: "House", path: "/images/frame double/frame double house.png?v=5" },
    { name: "Polkadot", path: "/images/frame double/frame double polkadot.png?v=5" },
    { name: "Purple Stripes", path: "/images/frame double/frame double purple stripes.png?v=5" },
    { name: "Stripes", path: "/images/frame double/frame double stripes.png?v=5" },
    { name: "Yellow", path: "/images/frame double/frame double yellow.png?v=5" },
  ];

  const tripletFrameStyles = [
    { name: "Classic", path: "/images/triple frame polos.png?v=4" },
    { name: "Color Frames", path: "/images/frame triple/frame triple color frames.png?v=5" },
    { name: "Windows", path: "/images/frame triple/frame triple windows.png?v=4" },
    { name: "Polaroid", path: "/images/frame triple/frame triple polaroid.png?v=4" },
    { name: "Purple", path: "/images/frame triple/frame triple purple.png?v=4" },
    { name: "Slumber Party", path: "/images/frame triple/frame triple slumber party.png?v=4" },
    { name: "Star", path: "/images/frame triple/frame triple star.png?v=5" },
    { name: "Stripes", path: "/images/frame triple/frame triplet stripes.png?v=5" },
  ];

  const handleFrameClick = (frame: { name: string; path: string }, type: string) => {
    if (type !== frameId) {
      setShowUnavailablePopup(true);
      setTimeout(() => setShowUnavailablePopup(false), 2000);
      return;
    }
    setSelectedFrameStyle(frame.path);
    setBgColor("#ffffff");
  };

  const renderFrameGrid = (frames: { name: string; path: string }[], type: string) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
      }}
    >
      {frames.map((frame) => (
        <button
          key={frame.path}
          onClick={() => handleFrameClick(frame, type)}
          style={{
            width: "100%",
            aspectRatio: "2/3",
            backgroundColor: "#f5f5f5",
            border:
              selectedFrameStyle === frame.path
                ? "4px solid #333"
                : "4px solid transparent",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "transform 0.1s",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title={frame.name}
        >
          <Image
            src={encodeURI(frame.path)}
            alt={frame.name}
            width={80}
            height={120}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    if (frameId && frameImages[frameId]) {
      setSelectedFrameStyle(frameImages[frameId]);
    }
  }, [frameId]);

  useEffect(() => {
    const photosParam = sessionStorage.getItem("capturedPhotos");
    const expectedCount = photoCount[frameId] || 1;
    const defaultPhotos = Array(expectedCount).fill("");

    if (photosParam) {
      try {
        const parsedPhotos = JSON.parse(photosParam) as string[];
        const normalizedPhotos = [...parsedPhotos];
        while (normalizedPhotos.length < expectedCount) {
          normalizedPhotos.push("");
        }
        setPhotos(normalizedPhotos.slice(0, expectedCount));
      } catch (e) {
        console.error("Failed to parse photos", e);
        setPhotos(defaultPhotos);
      }
    } else {
      setPhotos(defaultPhotos);
    }
  }, [frameId]);

  const colors = [
    "#fef9c3",
    "#bae6fd",
    "#fcd34d",
    "#bbf7d0",
    "#d9f99d",
    "#fbcfe8",
    "#fed7aa",
    "#ddd6fe",
    "#f87171",
    "#f472b6",
    "#78350f",
    "#000000",
  ];

  const getFrameStyleClass = (path: string) => {
    try {
      const filename = path.split("/").pop() || "";
      return filename
        .replace(".png", "")
        .replace(/\?.*$/, "")
        .replace(/ /g, "-")
        .toLowerCase();
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="choice-page" onMouseDown={(e) => {
      if ((e.target as HTMLElement).closest('.react-draggable')) return;
      setSelectedStickerId(null);
    }}>
      {showUnavailablePopup && (
          <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ff4d4f",
            border: "2px solid #000",
            borderRadius: "50%",
            padding: "30px 60px",
            zIndex: 1000,
            boxShadow: "6px 6px 0 rgba(0,0,0,1)",
            fontFamily: "'BitcountPropDouble', sans-serif",
            fontSize: "2.5rem",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          Unavailable
        </div>
      )}
      <div
        className="choice-card-large"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px",
          gap: "0px",
        }}
      >
        {/* Left Side: Frame */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            flex: 1,
            minWidth: "440px",
          }}
        >
          <div
            style={{
              transform: `rotate(-3deg) scale(${frameId === "single" ? 1.15 : frameId === "double" ? 1.1 : 1.05})`,
              transformOrigin: "center",
              filter: "drop-shadow(0px 12px 24px rgba(0, 0, 0, 0.15))",
            }}
          >
            <div
              ref={frameRef}
              className={`capture-frame-wrapper frame-${frameId} ${isClassicFrame ? "is-classic" : ""} ${getFrameStyleClass(selectedFrameStyle)}`}
              style={{
                position: "relative",
                backgroundColor: isClassicFrame ? (bgColor || "#ffffff") : "transparent",
              }}
            >
              {/* Render Image ONLY for non-classic frames with custom graphics */}
              {!isClassicFrame && (
              <img
                src={encodeURI(selectedFrameStyle)}
                alt="Frame"
                width={480}
                height={720}
                className="capture-frame-img"
                style={{ 
                  zIndex: 30
                }}
              />
              )}

            {/* Photos BELOW frame lines */}
            <div className="camera-overlay-container" style={{ zIndex: 20 }}>
              {photos.map((src, i) => (
                <div
                  key={i}
                  className="camera-preview-box"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {src && (
                    <img
                      src={src}
                      alt={`Captured ${i}`}
                      className="camera-preview-video"
                      style={{ transform: "none" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Stickers OVER everything */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 40, pointerEvents: activeTab === "Sticker" ? "auto" : "none" }}>
              {placedStickers.map((sticker) => (
                <Rnd
                  key={sticker.id}
                  size={{ width: sticker.width, height: sticker.height }}
                  position={{ x: sticker.x, y: sticker.y }}
                  onDragStop={(e, d) => {
                    setPlacedStickers(prev => prev.map(s => s.id === sticker.id ? { ...s, x: d.x, y: d.y } : s));
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setPlacedStickers(prev => prev.map(s => s.id === sticker.id ? { ...s, width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10), ...position } : s));
                  }}
                  onMouseDown={() => setSelectedStickerId(sticker.id)}
                  style={{
                    border: selectedStickerId === sticker.id && activeTab === "Sticker" ? "2px dashed #ff4d4f" : "none",
                  }}
                  enableResizing={activeTab === "Sticker"}
                  disableDragging={activeTab !== "Sticker"}
                  scale={frameId === "single" ? 1.15 : frameId === "double" ? 1.1 : 1.05}
                >
                  <img src={encodeURI(sticker.src)} style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }} />
                  {selectedStickerId === sticker.id && activeTab === "Sticker" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteSticker(sticker.id); }}
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "-10px",
                        background: "#ff4d4f",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        lineHeight: 1,
                        padding: 0,
                        zIndex: 50,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </Rnd>
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* Right Side: Editor */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: 0,
            minWidth: "440px",
            zIndex: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "4px",
              marginBottom: "-2px",
              zIndex: 1,
              marginLeft: "12px",
            }}
          >
            {["Color", "Frame", "Sticker"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 28px",
                  backgroundColor:
                    activeTab === tab
                      ? tab === "Color"
                        ? "#fbcfe8"
                        : tab === "Frame"
                          ? "#bae6fd"
                          : "#d9f99d"
                      : "#fff",
                  border: "2px solid #000",
                  borderRadius: activeTab === tab ? "24px" : "0",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  opacity: tab === "Color" && !isClassicFrame ? 0.5 : 1,
                  pointerEvents:
                    tab === "Color" && !isClassicFrame ? "none" : "auto",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              border: "2px solid #000",
              borderRadius: "0",
              padding: "40px",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.05)",
            }}
          >
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 16px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-left: 1px solid #ccc;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #d4d4d4;
                border: 1px solid #ccc;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #c0c0c0;
              }
              .frame-category-title {
                background-color: #bae6fd;
                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
                padding: 4px 8px;
                font-family: var(--font-body);
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 12px;
              }
            `}</style>
            {activeTab === "Color" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "24px",
                  width: "100%",
                  margin: "auto",
                }}
              >
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBgColor(color)}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      backgroundColor: color,
                      border:
                        bgColor === color ? "4px solid #333" : "2px solid #000",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "transform 0.1s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                ))}
              </div>
            )}
            {activeTab === "Frame" && (
              <div
                className="custom-scrollbar"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto",
                  paddingRight: "8px",
                  margin: "0",
                }}
              >
                <div>
                  <div className="frame-category-title">Single Frames</div>
                  {renderFrameGrid(singleFrameStyles, "single")}
                </div>
                <div>
                  <div className="frame-category-title">Double Frames</div>
                  {renderFrameGrid(doubleFrameStyles, "double")}
                </div>
                <div>
                  <div className="frame-category-title">Triple Frames</div>
                  {renderFrameGrid(tripletFrameStyles, "triplet")}
                </div>
              </div>
            )}
            {activeTab === "Sticker" && (
              <div
                className="custom-scrollbar"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  width: "100%",
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto",
                  paddingRight: "8px",
                  alignContent: "start",
                }}
              >
                {stickerImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => handleAddSticker(src)}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.1s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <Image
                      src={encodeURI(src)}
                      alt="Sticker"
                      width={100}
                      height={100}
                      style={{ objectFit: "contain", width: "100%", height: "100%" }}
                    />
                  </button>
                ))}
              </div>
            )}
            {activeTab !== "Color" && activeTab !== "Frame" && activeTab !== "Sticker" && (
              <div
                style={{
                  margin: "auto",
                  color: "#999",
                  fontFamily: "var(--font-body)",
                }}
              >
                Coming soon...
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <button
              className="frame-continue-btn"
              disabled={isGenerating}
              style={{ opacity: isGenerating ? 0.7 : 1 }}
              onClick={async () => {
                if (activeTab === "Color") {
                  setActiveTab("Frame");
                } else if (activeTab === "Frame") {
                  setActiveTab("Sticker");
                } else {
                  if (frameRef.current) {
                    setIsGenerating(true);
                    setSelectedStickerId(null); // deselect to hide borders
                    await new Promise((r) => setTimeout(r, 100)); // wait for React re-render
                    try {
                      const canvas = await html2canvas(frameRef.current, {
                        scale: 3,
                        useCORS: true,
                        backgroundColor: null,
                      });
                      const dataUrl = canvas.toDataURL("image/png", 1.0);
                      sessionStorage.setItem("finalPhotostrip", dataUrl);
                      router.push(`/capture/${frameId}/download`);
                    } catch (error) {
                      console.error("Failed to generate photostrip", error);
                      setIsGenerating(false);
                    }
                  } else {
                    router.push(`/capture/${frameId}/download`);
                  }
                }
              }}
            >
              {isGenerating ? "processing..." : "continue"}
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
