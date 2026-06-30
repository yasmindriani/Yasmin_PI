import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="page-wrapper">
      <Navbar />
      <section className="hero-section">
        <Hero />
      </section>

      <Footer />
    </main>
  );
}
