import { useEffect, useRef } from "react";
import { Clock, Users, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { step: "01", icon: Clock, title: "Book Online", desc: "Schedule your appointment online in under 2 minutes." },
  { step: "02", icon: Users, title: "Consult Specialist", desc: "Meet with a top specialist tailored to your needs." },
  { step: "03", icon: CheckCircle, title: "Get Better", desc: "Follow your personalized treatment plan to recovery." },
];

const StepsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step-line", {
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        scaleX: 0, duration: 1, ease: "power2.out", clearProps: "transform",
      });
      gsap.from(".step-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        y: 40, duration: 0.6, stagger: 0.2, delay: 0.3, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container-main">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2">How It Works</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Your Care Journey in 3 Simple Steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="step-line hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 origin-left" />
          {steps.map((item) => (
            <div key={item.step} className="step-card text-center relative z-10 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal-500/20 transition-all">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
