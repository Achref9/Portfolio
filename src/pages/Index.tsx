import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Education from '@/components/Education';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Education />
          <Projects />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Index;
