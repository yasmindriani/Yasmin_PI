import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link href="/capture" className="nav-link">
        Capture
      </Link>

      <Link href="/" className="brand-logo">
        BERRIEBOOTH
      </Link>

      <Link href="/contact" className="nav-link">
        Contact
      </Link>
    </header>
  );
}
