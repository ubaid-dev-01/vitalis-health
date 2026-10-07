import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import doctorSarah from "@/assets/doctor-sarah.jpg";
import doctorEmily from "@/assets/doctor-emily.jpg";
import doctorLisa from "@/assets/doctor-lisa.jpg";

gsap.registerPlugin(ScrollTrigger);

const doctors = [
  { name: "Dr. Sarah Chen", specialty: "Cardiology", rating: 4.9, img: doctorSarah },
  { name: "Dr. Emily Rodriguez", specialty: "Oncology", rating: 4.9, img: doctorEmily },
  { name: "Dr. Lisa Thompson", specialty: "Pediatrics", rating: 4.9, img: doctorLisa },
];

const DoctorsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".doc-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        y: 50, duration: 0.6, stagger: 0.15, clearProps: "transform",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-muted/50">
      <div className="container-main">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2">Our Experts</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Meet Our Leading Specialists</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <Link key={doc.name} to="/doctors" className="doc-card rounded-xl bg-card border border-border overflow-hidden card-hover group block">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" width={512} height={640} />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground">{doc.name}</h3>
                <p className="text-sm text-primary mb-2">{doc.specialty}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.floor(doc.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"} />)}
                  <span className="text-sm text-muted-foreground ml-1">{doc.rating}</span>
                </div>
                <span className="inline-flex items-center text-sm font-medium text-primary gap-1 group-hover:gap-2 transition-all">
                  View Profile <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
