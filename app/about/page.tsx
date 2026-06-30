import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
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
              About Me
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
              Hii! 👋 I'm Yasmin, and I created BerrieBooth as part of a scientific writing project for one of my university courses. What started as an academic assignment quickly became a fun and rewarding experience, allowing me to combine creativity, web development, and design into a single project.
            </p>
            <p>
              Since this project is independently developed by me, there may still be areas that can be improved. If you encounter any issues or have suggestions for new features, feel free to reach out. Your feedback is always appreciated and helps make BerrieBooth even better.
            </p>
            <p>
              I'm continuously learning and exploring new ideas, so this project may receive updates and improvements over time. You can also follow me on Instagram and TikTok at @berriebooth to stay updated on future developments, creative projects, and anything new I decide to build along the way.
            </p>
            <p>
              Thank you for visiting BerrieBooth, and I hope you enjoy your experience! &lt;3
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
