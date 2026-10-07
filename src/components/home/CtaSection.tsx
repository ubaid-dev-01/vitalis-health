import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamImg from "@/assets/team-section.jpg";

gsap.registerPlugin(ScrollTrigger);

const CtaSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        y: 40, duration: 0.7, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <img src={teamImg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1280} height={720} />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-800/90 to-emerald-700/90" />
      <div className="container-main relative z-10 text-center cta-content">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Experience Exceptional Care?</h2>
        <p className="text-lg text-teal-100 mb-8 max-w-xl mx-auto">Join 15,000+ patients who trust Vitalis Health for their healthcare needs.</p>
        <Link to="/book" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white text-teal-700 font-semibold hover:bg-teal-50 hover:scale-105 transition-all shadow-lg">
          Book Appointment Now <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
