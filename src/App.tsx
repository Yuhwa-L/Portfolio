import { AmbientBackground } from '@/components/background/AmbientBackground';
import { ConstellationField } from '@/components/background/ConstellationField';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { Metrics } from '@/components/sections/Metrics';
import { About } from '@/components/sections/About';
import { Education } from '@/components/sections/Education';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Resume } from '@/components/sections/Resume';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-text-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <AmbientBackground />
      <ConstellationField />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        <Projects />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
