import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
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
              fontSize: '2.5rem', 
              fontFamily: 'var(--font-brand)',
              textAlign: 'center',
              letterSpacing: '0.05em',
              margin: 0
            }}>
              Terms and Conditions
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
              By accessing or using BerrieBooth, you agree to the following Terms and Conditions.
            </p>
            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>Use of the Website</h2>
              <p>
                You may use BerrieBooth for personal, non commercial purposes or for approved business related activities. Users must not misuse, disrupt, or attempt to interfere with the functionality, security, or availability of the website.
              </p>
            </div>
            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>Data and Analytics</h2>
              <p>
                To help improve our services, BerrieBooth uses Vercel Analytics to collect anonymous usage data, including page visits, browser information, device type, and website performance metrics. No personally identifiable information is collected.
              </p>
            </div>
            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>Service Availability</h2>
              <p>
                We strive to keep BerrieBooth accessible and operating smoothly. However, we cannot guarantee that the website will always be available, uninterrupted, secure, or free from technical issues.
              </p>
            </div>
            <div>
              <h2 style={{ color: '#d86c8f', fontSize: '1.05rem', fontWeight: 600, marginBottom: '6px' }}>Changes to These Terms</h2>
              <p>
                We may update these Terms and Conditions from time to time. Any changes will take effect once published on this page. By continuing to use BerrieBooth after updates are made, you agree to the revised terms.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
