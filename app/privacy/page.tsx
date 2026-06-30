import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
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
              margin: 0,
              textTransform: 'uppercase'
            }}>
              Privacy Policy
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
              This Privacy Policy explains how BerrieBooth handles information when you use our free online photobooth service.
            </p>

            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>Information We Do Not Collect</h2>
              
              <div style={{ marginBottom: '8px' }}>
                <h3 style={{ color: '#d86c8f', fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>Photos and Images</h3>
                <p>
                  All photos taken with BerrieBooth are processed directly in your browser. We do not upload, store, save, or share your photos on any server or database.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#d86c8f', fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>Personal Information</h3>
                <p>
                  BerrieBooth does not request, collect, or store personal information such as your name, email address, phone number, or other contact details.
                </p>
              </div>
            </div>

            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>Information We Collect</h2>
              
              <div>
                <h3 style={{ color: '#d86c8f', fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>Anonymous Analytics</h3>
                <p>
                  To better understand how our website is used, we utilize Vercel Analytics. This service collects anonymous information such as page visits, browser type, device information, and website performance data.
                </p>
              </div>
            </div>

            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>How Information Is Used</h2>
              
              <div style={{ marginBottom: '8px' }}>
                <h3 style={{ color: '#d86c8f', fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>Website Improvement</h3>
                <p>
                  Anonymous analytics help us monitor website performance, identify areas for improvement, and enhance the overall user experience.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#d86c8f', fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>Browser Based Processing</h3>
                <p>
                  All photo related features including camera access, image editing, filter effects, and downloads are performed locally on your device. Your photos never leave your browser unless you choose to save them yourself.
                </p>
              </div>
            </div>

            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>Security</h2>
              <p style={{ marginBottom: '8px' }}>We are committed to protecting your privacy by:</p>
              <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
                <li>Using HTTPS encryption for secure connections</li>
                <li>Not storing personal information on servers</li>
                <li>Keeping photo processing entirely on your device</li>
                <li>Relying on Vercel's secure infrastructure for analytics data</li>
              </ul>
            </div>

            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, fontStyle: 'italic', marginBottom: '8px' }}>Contact</h2>
              <p style={{ marginBottom: '4px' }}>If you have any questions about this Privacy Policy, feel free to contact us:</p>
              <p>
                Email: berriepetals@gmail.com<br/>
                Instagram : @berriepetals<br/>
                Tiktok : @berriepetals_
              </p>
            </div>

            <p style={{ marginTop: '8px' }}>
              By using BerrieBooth, you acknowledge and agree to the practices described in this Privacy Policy.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
