import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  CopySimple,
  Check,
  Phone
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const emailBoxRef = useRef<HTMLDivElement>(null);
  const copyEmailBtnRef = useRef<HTMLButtonElement>(null);
  const copyPhoneBtnRef = useRef<HTMLButtonElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(emailBoxRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(iconsRef.current?.children || [], { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, stagger: 0.1 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);

    if (type === 'email') {
      setCopiedEmail(true);
      gsap.fromTo(copyEmailBtnRef.current, { scale: 1 }, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 });
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      gsap.fromTo(copyPhoneBtnRef.current, { scale: 1 }, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 });
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!starsContainerRef.current) return;

      const star = document.createElement('div');
      star.className = 'absolute w-1 h-1 bg-white rounded-full';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 50}%`;
      star.style.boxShadow = '0 0 6px 2px rgba(255,255,255,0.8)';
      star.style.background = 'linear-gradient(90deg, white, rgba(255,255,255,0))';

      starsContainerRef.current.appendChild(star);

      gsap.to(star, {
        x: 250,
        y: 120,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.out',
        onComplete: () => star.remove(),
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-light mb-16">
          Get In <span className="text-gradient">Touch</span>
        </h2>

        {/* Email + Phone Box */}
        <div className="relative mb-12 flex justify-center">
          <div
            ref={emailBoxRef}
            className="glass max-w-xl mx-auto rounded-2xl p-8 flex flex-col items-center gap-5 text-lg text-muted-foreground relative z-10"
          >
            {/* EMAIL */}
            <div className="flex items-center gap-4">
              <EnvelopeSimple size={24} weight="light" className="text-primary" />
              <a href="mailto:abidi.achref030@gmail.com" className="hover:text-primary transition-colors">
                abidi.achref030@gmail.com
              </a>
              <button
                ref={copyEmailBtnRef}
                onClick={() => handleCopy('abidi.achref030@gmail.com', 'email')}
                className="ml-2 p-2 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Copy email"
              >
                {copiedEmail ? (
                  <Check size={20} weight="light" className="text-green-500" />
                ) : (
                  <CopySimple size={20} weight="light" className="text-muted-foreground hover:text-primary" />
                )}
              </button>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-4">
              <Phone size={24} weight="light" className="text-primary" />
              <a href="tel:+21693020718" className="hover:text-primary transition-colors">
                +216 93 020 718
              </a>
              <button
                ref={copyPhoneBtnRef}
                onClick={() => handleCopy('+21693020718', 'phone')}
                className="ml-2 p-2 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Copy phone"
              >
                {copiedPhone ? (
                  <Check size={20} weight="light" className="text-green-500" />
                ) : (
                  <CopySimple size={20} weight="light" className="text-muted-foreground hover:text-primary" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div ref={iconsRef} className="flex justify-center gap-6">
          <a
            href="https://github.com/Achref9"
            target="_blank"
            rel="noopener noreferrer"
            className="glass w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 group"
          >
            <GithubLogo size={24} weight="light" className="text-muted-foreground group-hover:text-primary" />
          </a>

          <a
            href="https://www.linkedin.com/in/achref-abidi-/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 group"
          >
            <LinkedinLogo size={24} weight="light" className="text-muted-foreground group-hover:text-primary" />
          </a>
        </div>
      </div>

      <div
        ref={starsContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Contact;
