"use client";

import { useRouter, useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

export default function CameraPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const frameId = params.id as string;
  const filterId = searchParams.get("filter") || "normal";

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [flash, setFlash] = useState(false);

  // Use a ref so takePhoto always has the latest stream without stale closures
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Setup camera stream once on mount
  useEffect(() => {
    let mounted = true;

    async function setupCamera() {
      try {
        const ms = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 1280, height: 720 },
          audio: false,
        });
        if (!mounted) {
          ms.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = ms;
        setStream(ms);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    setupCamera();

    return () => {
      mounted = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Callback ref — called by React immediately whenever the <video> element mounts
  // This fires AFTER state updates, so stream is already set.
  const attachStream = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el && streamRef.current) {
      el.srcObject = streamRef.current;
      el.play().catch(() => {});
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCapturing && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (isCapturing && timer === 0) {
      setTimer(null);
      takePhoto();
    }
    return () => clearInterval(interval);
  }, [isCapturing, timer]);

  const startCapture = () => {
    if (isCapturing) return;
    setCapturedPhotos([]);
    setIsCapturing(true);
    setTimer(5);
  };

  const takePhoto = (retryCount = 0) => {
    setFlash(true);
    setTimeout(() => setFlash(false), 500);

    const video = videoRef.current;
    if (!video) {
      if (retryCount < 30) setTimeout(() => takePhoto(retryCount + 1), 100);
      return;
    }
    if (video.videoWidth === 0 || video.readyState < 2) {
      if (retryCount < 30) setTimeout(() => takePhoto(retryCount + 1), 100);
      return;
    }

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    const aspectRatios: Record<string, number> = {
      single: 0.89,
      double: 1.04,
      triplet: 1.17,
    };
    const targetAspectRatio = aspectRatios[frameId] || 1;

    let cropWidth = videoWidth;
    let cropHeight = videoHeight;
    let cropX = 0;
    let cropY = 0;
    const videoAR = videoWidth / videoHeight;

    if (videoAR > targetAspectRatio) {
      cropWidth = Math.floor(videoHeight * targetAspectRatio);
      cropX = Math.floor((videoWidth - cropWidth) / 2);
    } else {
      cropHeight = Math.floor(videoWidth / targetAspectRatio);
      cropY = Math.floor((videoHeight - cropHeight) / 2);
    }

    const canvas = document.createElement("canvas");
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const filterMap: Record<string, string> = {
      normal: "none",
      bw: "grayscale(100%) contrast(1.1)",
      retro: "grayscale(70%) sepia(40%) contrast(150%) brightness(95%)",
      soft: "blur(2px) brightness(170%) contrast(90%) saturate(110%)",
    };

    // WORKAROUND FOR SAFARI/iOS: 
    // Safari ignores ctx.filter when drawing directly from a <video> element.
    // To fix this, we draw the video to a temporary offscreen canvas first, 
    // then draw that canvas onto our main canvas where the filter will successfully apply.
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = videoWidth;
    tempCanvas.height = videoHeight;
    const tempCtx = tempCanvas.getContext("2d");
    if (tempCtx) {
      tempCtx.drawImage(video, 0, 0, videoWidth, videoHeight);
    }

    ctx.filter = filterMap[filterId] || "none";
    ctx.translate(cropWidth, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(tempCanvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    const newPhotoData = canvas.toDataURL("image/jpeg", 0.7);

    setCapturedPhotos((prev) => {
      const updated = [...prev, newPhotoData];
      sessionStorage.setItem("capturedPhotos", JSON.stringify(updated));
      if (updated.length < photoCount[frameId]) {
        setTimeout(() => setTimer(5), 1000);
      } else {
        setIsCapturing(false);
        setTimeout(() => {
          router.push(`/capture/${frameId}/retake?filter=${filterId}`);
        }, 1000);
      }
      return updated;
    });
  };

  const total = photoCount[frameId] || 1;
  const activeSlot = capturedPhotos.length;

  return (
    <div className="choice-page">
      {flash && <div className="flash-effect"></div>}

      <div className="choice-card-large">
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>
        <div className="border-t"></div>

        <div className="capture-container">
          {/* Timer is now rendered inside the active camera box */}

          <div
            className={`capture-frame-wrapper frame-${frameId} is-classic`}
            style={{
              transform: "rotate(-3deg)",
              position: "relative",
              backgroundColor: "#ffffff",
            }}
          >
            {/* Photos BELOW frame lines */}
            <div className="camera-overlay-container" style={{ zIndex: 20 }}>
              {Array.from({ length: total }).map((_, i) => (
                <div key={i} className="camera-preview-box">
                  {capturedPhotos[i] ? (
                    <img
                      src={capturedPhotos[i]}
                      alt={`Photo ${i + 1}`}
                      className="camera-preview-video"
                      style={{ transform: "none" }}
                    />
                  ) : isCapturing && i === activeSlot ? (
                    <>
                      <video
                        key={`video-${i}`}
                        ref={attachStream}
                        autoPlay
                        playsInline
                        muted
                        className={`camera-preview-video filter-${filterId}`}
                      />
                      {timer !== null && <div className="timer-overlay">{timer}</div>}
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {!isCapturing && (
            <button className="start-capture-btn" onClick={startCapture}>
              click to start
            </button>
          )}
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
