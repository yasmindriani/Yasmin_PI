import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="page-wrapper" style={{ background: '#fff' }}>
      <section style={{ 
        flex: 1,
        padding: '60px 20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        background: '#fff' 
      }}>
        <div style={{ maxWidth: '680px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '32px' }}>
            <Link href="/" style={{ position: 'absolute', left: 0, display: 'inline-flex', alignItems: 'center', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <Image
                src={encodeURI("/images/arrow back.png")}
                alt="Back"
                width={40}
                height={40}
              />
            </Link>
            <h1 style={{ 
              color: 'var(--pink-dark)', 
              fontSize: '3rem', 
              fontFamily: 'var(--font-brand)',
              textAlign: 'center',
              letterSpacing: '0.05em',
              margin: 0
            }}>
              Contact
            </h1>
          </div>
          
          <div style={{ 
            color: '#000', 
            lineHeight: '1.7', 
            fontSize: '0.95rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontWeight: 400
          }}>
            <p>
              Have feedback, suggestions, or something on your mind? Feel free to reach out!
            </p>
            <p style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span>
                Email: <a href="mailto:berriepetals@gmail.com" style={{ color: 'var(--pink-dark)', textDecoration: 'none', fontWeight: 500 }}>berriepetals@gmail.com</a>
              </span>
              <span>
                Instagram : <a href="https://instagram.com/berriepetals" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pink-dark)', textDecoration: 'none', fontWeight: 500 }}>@berriepetals</a>
              </span>
              <span>
                Tiktok : <a href="https://tiktok.com/@berriepetals_" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pink-dark)', textDecoration: 'none', fontWeight: 500 }}>@berriepetals_</a>
              </span>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
