import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-brand">
          BERRIEBOOTH
        </Link>

        <div className="footer-col">
          <div className="footer-heading">Menu</div>
          <Link href="/" className="footer-link">
            Home
          </Link>
          <Link href="/capture" className="footer-link">
            Capture
          </Link>
          <Link href="/about" className="footer-link" style={{ whiteSpace: 'nowrap' }}>
            About me
          </Link>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Contact</div>
          <a
            href="mailto:berriepetals@gmail.com"
            className="footer-link footer-email"
          >
            <Image
              src="/images/memory_email.png"
              alt="email"
              width={16}
              height={16}
              className="social-icon"
            />
            berriepetals@gmail.com
          </a>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Social Media</div>
          <a
            href="https://instagram.com/berriepetals"
            target="_blank"
            rel="noreferrer"
            className="footer-link footer-social"
          >
            <Image
              src="/images/pixel_instagram.png"
              alt="instagram"
              width={16}
              height={16}
              className="social-icon"
            />
            @berriepetals
          </a>
          <a
            href="https://tiktok.com/@berriepetals_"
            target="_blank"
            rel="noreferrer"
            className="footer-link footer-social"
          >
            <Image
              src="/images/pixel_tiktok.png"
              alt="tiktok"
              width={16}
              height={16}
              className="social-icon"
            />
            @berriepetals_
          </a>
        </div>
      </div>
    </footer>
  );
}
