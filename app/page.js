import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Writing from "@/components/Writing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <div id="top" className="max-w-content mx-auto px-5 sm:px-8 md:px-12">
        <Hero />
        <Projects />
        <Stack />
        <About />
        <Certifications />
        <Writing />
        <Footer />
      </div>
    </>
  );
}
