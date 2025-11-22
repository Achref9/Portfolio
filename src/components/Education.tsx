import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, CalendarBlank, MapPin } from '@phosphor-icons/react';
import isammLogo from '@/assets/isamm-logo.png';
import isetLogo from '@/assets/iset-logo.png';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Computer Science and Multimedia Engineering',
    institution: 'Higher Institute of Arts and Multimedia Manouba',
    location: 'Manouba Campus',
    period: '2023 - Present',
    status: 'Expected graduation: June 2026',
    current: true,
    logo: isammLogo,
  },
  {
    degree: 'Bachelor of Information Technology',
    specialization: 'Development of Information Systems',
    institution: 'Higher Institute of Technological Studies',
    location: 'Jendouba',
    period: '2023',
    status: 'Graduated',
    current: false,
    logo: isetLogo,
  },
  {
    degree: 'Baccalaureate of Experimental Science',
    institution: 'Liberty High School',
    location: 'Jendouba',
    period: '2020',
    status: 'Completed',
    current: false,
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
          <span className="text-gradient">Education</span>
        </h2>

        <div ref={cardsRef} className="max-w-4xl mx-auto space-y-8">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className={`glass rounded-2xl p-6 md:p-8 hover:glow transition-all duration-500 group ${
                edu.current ? 'border-2 border-primary/30' : ''
              }`}
            >
              <div className="flex items-start gap-4 md:gap-6">
                <div className={`p-3 md:p-4 rounded-xl transition-colors ${
                  edu.current 
                    ? 'bg-primary/20 group-hover:bg-primary/30' 
                    : 'bg-primary/10 group-hover:bg-primary/20'
                }`}>
                  {edu.logo ? (
                    <img 
                      src={edu.logo} 
                      alt={edu.institution}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <GraduationCap 
                      size={32} 
                      weight="light" 
                      className={edu.current ? 'text-primary' : 'text-primary/70'} 
                    />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-light mb-1 text-foreground">
                    {edu.degree}
                  </h3>
                  {edu.specialization && (
                    <p className="text-sm md:text-base text-muted-foreground mb-2">
                      {edu.specialization}
                    </p>
                  )}
                  <p className="text-base md:text-lg text-primary mb-3">
                    {edu.institution}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 md:gap-4 text-sm md:text-base text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarBlank size={18} weight="light" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} weight="light" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground">
                    <span className={`font-medium ${edu.current ? 'text-primary' : 'text-foreground'}`}>
                      {edu.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Education;
