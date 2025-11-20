import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from './ui/button';
import { ArrowRight, DownloadSimple } from '@phosphor-icons/react';

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo(
        splineContainerRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
        '-=1'
      );
  }, []);

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div ref={splineContainerRef} className="absolute inset-0 z-0 opacity-60">
        <iframe
          src="https://my.spline.design/animatedgradientbackgroundforweb-copy-5f33e4f5f3c8fb8c68a93ca78c4ad9fb/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
        />
      </div>

      {/* Floating Neon Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6"
        >
          Hi, I'm <span className="text-gradient font-normal">Achref Abidi</span>
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground">
            Software Engineering Student
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Crafting immersive digital experiences with cutting-edge technologies.
          Specialized in full-stack development, AI/ML, and VR solutions.
        </p>

        {/* CTA Buttons */}
<div ref={ctaRef} className="flex flex-col items-center gap-6">
          <Button 
            onClick={handleCTAClick}
            size="lg"
            className="group relative bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-2xl glow hover:glow-lg transition-all duration-300 hover:scale-105"
          >
            Recruit Me
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="group border-primary/30 bg-background/10 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
            <a href="/portfolio/AchrefAbidi-Resume-EN.pdf" download>
                <DownloadSimple className="mr-2 group-hover:translate-y-0.5 transition-transform" size={18} />
                CV English
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              asChild
              className="group border-primary/30 bg-background/10 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
            >
<a href="/portfolio/AchrefAbidi-Resume-FR.pdf" download>
                <DownloadSimple className="mr-2 group-hover:translate-y-0.5 transition-transform" size={18} />
                CV Français
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <span className="text-primary animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
