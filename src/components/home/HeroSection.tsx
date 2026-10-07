import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Award, Stethoscope, CalendarCheck, HeartPulse, ArrowRight } from "lucide-react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import cardSpecialists from "@/assets/card-specialists.jpg";
import cardBooking from "@/assets/card-booking.jpg";
import cardEmergency from "@/assets/card-emergency.jpg";
import cardAward from "@/assets/card-award.jpg";

const cards = [
  { icon: Stethoscope, title: "Expert Specialists", desc: "120+ board-certified physicians across 6 departments", img: cardSpecialists, link: "/doctors", cta: "Meet Our Doctors" },
  { icon: CalendarCheck, title: "Easy Booking", desc: "Schedule online in under 2 minutes, 24/7 availability", img: cardBooking, link: "/book", cta: "Book Now" },
  { icon: HeartPulse, title: "24/7 Emergency", desc: "Round-the-clock emergency care with rapid response teams", img: cardEmergency, link: "/contact", cta: "Get Help Now" },
  { icon: Award, title: "Award Winning", desc: "Top-rated hospital for patient satisfaction 5 years running", img: cardAward, link: "/about", cta: "Learn More" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure all elements are visible first
      gsap.set([".hero-badge", ".hero-title", ".hero-desc", ".hero-cta", ".hero-trust", ".hero-card"], { opacity: 1, visibility: "visible" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { opacity: 0, y: 30, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.5, stagger: 0.15 }, "-=0.3")
        .from(".hero-trust", { opacity: 0, y: 15, duration: 0.5 }, "-=0.2")
        .from(".hero-card", { opacity: 0, y: 40, scale: 0.9, duration: 0.5, stagger: 0.12, clearProps: "all" }, "-=0.4");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate min-h-screen flex items-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 z-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/50" />
      <div className="container-main relative z-20 py-32">
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative z-20">
            <div className="hero-badge flex items-center gap-2 mb-6">
              <Shield size={16} className="text-teal-400" />
              <span className="text-sm font-semibold text-teal-300 tracking-wide uppercase">JCI Accredited & HIPAA Compliant</span>
            </div>
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
              Exceptional Care.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Extraordinary Outcomes.</span>
            </h1>
            <p className="hero-desc text-lg text-slate-200 mb-8 max-w-lg leading-relaxed">
              World-class healthcare powered by compassion, innovation, and 25+ years of medical excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="hero-cta px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-105 transition-all text-base shadow-lg shadow-teal-900/30">
                Book Appointment
              </Link>
              <Link to="/services" className="hero-cta px-7 py-3.5 rounded-lg border-2 border-white/40 text-white font-semibold hover:bg-white/10 hover:border-white/60 transition-all text-base">
                Explore Services
              </Link>
            </div>
            <div className="hero-trust flex items-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-sm text-slate-300"><Award size={18} className="text-teal-400" /> JCI Accredited</div>
              <div className="flex items-center gap-2 text-sm text-slate-300"><Shield size={18} className="text-teal-400" /> HIPAA Compliant</div>
            </div>
          </div>

          <div className="relative z-30 grid grid-cols-2 gap-3 lg:gap-4">
            {cards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="hero-card relative z-10 block min-h-[138px] lg:min-h-[170px] overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 group transform-gpu hover:border-white/30 hover:scale-105"
              >
                <img src={card.img} alt={card.title} className="absolute inset-0 z-0 w-full h-full object-cover opacity-30 transition-opacity duration-500 group-hover:scale-110 group-hover:opacity-50" width={512} height={512} />
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
                <div className="relative z-20 flex h-full min-h-[138px] lg:min-h-[160px] flex-col justify-end p-4 lg:p-5">
                  <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors">
                    <card.icon size={20} className="text-teal-400" />
                  </div>
                  <h3 className="text-white font-semibold text-xs lg:text-sm mb-1">{card.title}</h3>
                  <p className="text-slate-400 text-[11px] lg:text-xs leading-relaxed group-hover:text-slate-300 transition-colors mb-3">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-400 group-hover:gap-2 transition-all">
                    {card.cta} <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
