import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, Brain, Microscope, Bone, Baby, UserRound, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services as servicesData } from "@/data/mockData";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = { Heart, Brain, Microscope, Bone, Baby, UserRound };

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-heading", {
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        y: 30, duration: 0.6, clearProps: "transform",
      });
      gsap.from(".svc-card", {
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        y: 40, duration: 0.5, stagger: 0.1, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container-main">
        <div className="svc-heading text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2">Our Services</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Comprehensive Healthcare Solutions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((svc) => {
            const Icon = iconMap[svc.icon] || Heart;
            return (
              <Link key={svc.id} to="/services" className="svc-card p-6 rounded-xl bg-card border border-border card-hover group cursor-pointer block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{svc.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{svc.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 transition-all gap-1">
                  Learn More <ChevronRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
