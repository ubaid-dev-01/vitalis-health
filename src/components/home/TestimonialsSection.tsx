import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/data/mockData";

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-wrap", {
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        y: 40, duration: 0.7, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container-main">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2">Testimonials</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">What Our Patients Say</h2>
        </div>
        <div className="testimonial-wrap max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-lg font-bold text-primary">
            {testimonials[active].avatar}
          </div>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(testimonials[active].rating)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
          </div>
          <p className="text-lg text-foreground italic mb-4">"{testimonials[active].quote}"</p>
          <p className="font-semibold text-foreground">{testimonials[active].name}</p>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className={`w-3 h-3 rounded-full transition-all ${i === active ? "bg-primary scale-125" : "bg-border hover:bg-primary/40"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
