import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(end / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(start);
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
};

const stats = [
  { value: 15000, suffix: "+", label: "Patients Served" },
  { value: 98, suffix: ".4%", label: "Satisfaction Rate" },
  { value: 120, suffix: "+", label: "Specialists" },
  { value: 25, suffix: "+", label: "Years Excellence" },
];

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        y: 30, duration: 0.6, stagger: 0.15, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-card border-y border-border">
      <div className="container-main py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
