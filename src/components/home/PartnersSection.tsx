import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = ["BlueCross", "Aetna", "Cigna", "United", "Humana", "Kaiser"];

const PartnersSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".partner-item", {
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        y: 20, duration: 0.4, stagger: 0.08, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-background border-t border-border">
      <div className="container-main">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">Trusted by Leading Healthcare Networks & Insurance Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {partners.map((name) => (
            <div key={name} className="partner-item px-6 py-3 rounded-lg bg-muted/50 text-muted-foreground text-sm font-semibold tracking-wide opacity-60 hover:opacity-100 hover:scale-110 transition-all cursor-pointer">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
