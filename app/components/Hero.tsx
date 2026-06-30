import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero-card">
      <div className="hero-image-wrapper">
        <Image
          src="/images/Ellipse%2013.png"
          alt="ellipse background"
          width={920}
          height={920}
          className="ellipse-image"
          priority
        />
        <Image
          src="/images/berrie%20home%201.png"
          alt="berrie home"
          width={600}
          height={600}
          className="hero-image"
          priority
        />
        <div className="enter-overlay">
          <Link href="/capture" className="enter-btn">
            <span className="enter-text">Enter &gt;</span>
          </Link>
        </div>
      </div>

      <div className="house-footer-links">
        <Link href="/privacy" className="footer-house-link">
          Privacy Policy
        </Link>
        <Link href="/terms" className="footer-house-link">
          Terms &amp; Condition
        </Link>
      </div>
    </div>
  );
}
