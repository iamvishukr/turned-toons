import { Nav, SmoothScroll } from "@/components/Chrome";
import Hero from "@/components/Hero";
import Ribbon from "@/components/Ribbon";
import Showcase from "@/components/Showcase";
import Gallery from "@/components/Gallery";
import { Contact, Faq, Footer, Process, Services } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Ribbon />
        <Showcase />
        <Gallery />
        <Process />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
