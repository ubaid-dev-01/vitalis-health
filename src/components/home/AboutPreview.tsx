import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImg from "@/assets/about-section.jpg";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  "JCI Accredited hospital since 2005",
  "25+ years of healthcare excellence",
  "Advanced diagnostic & treatment technology",
  "Patient-centered, compassionate care",
];

const AboutPreview = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-img", {
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        x: -60, duration: 0.8, clearProps: "transform",
      });
      gsap.from(".about-text", {
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        x: 60, duration: 0.8, delay: 0.2, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-muted/50">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-img rounded-2xl overflow-hidden shadow-xl">
            <img src={aboutImg} alt="Vitalis Health facility" className="w-full h-80 lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700" loading="lazy" width={1280} height={720} />
          </div>
          <div className="about-text">
            <p className="text-sm font-semibold text-primary mb-2">About Us</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Families Trust Vitalis Health</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              For over two decades, Vitalis Health has been at the forefront of medical innovation, delivering personalized care that puts patients first.
            </p>
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <CheckCircle size={18} className="text-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-105 transition-all">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
