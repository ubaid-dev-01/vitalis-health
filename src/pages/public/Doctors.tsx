import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { doctors } from "@/data/mockData";
import { Link } from "react-router-dom";
import doctorsHero from "@/assets/doctors-hero.jpg";
import doctorSarah from "@/assets/doctor-sarah.jpg";
import doctorEmily from "@/assets/doctor-emily.jpg";
import doctorLisa from "@/assets/doctor-lisa.jpg";
import doctorJames from "@/assets/doctor-james.jpg";
import doctorMichael from "@/assets/doctor-michael.jpg";
import doctorDavid from "@/assets/doctor-david.jpg";

const doctorImages: Record<string, string> = {
  SC: doctorSarah, ER: doctorEmily, LT: doctorLisa,
  JM: doctorJames, MP: doctorMichael, DK: doctorDavid,
};

const specialties = ["All", "Cardiology", "Neurology", "Oncology", "Orthopedics", "Pediatrics", "Women's Health"];

const Doctors = () => {
  useScrollTop();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? doctors : doctors.filter((d) => d.specialty === filter);

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={doctorsHero} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-teal-900/80 to-slate-900/85" />
        <div className="container-main text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Specialists</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="text-lg text-slate-300 max-w-2xl mx-auto">120+ world-class physicians dedicated to exceptional patient outcomes.</motion.p>
        </div>
      </section>

      <section className="py-8 bg-card border-b border-border sticky top-[60px] z-30">
        <div className="container-main flex flex-wrap gap-2">
          {specialties.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-main">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((doc) => {
              const imgSrc = doctorImages[doc.image];
              return (
                <motion.div key={doc.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-card border border-border overflow-hidden card-hover group">
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    {imgSrc ? (
                      <img src={imgSrc} alt={doc.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" width={512} height={640} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                          {doc.image}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-sm text-primary mb-1">{doc.specialty}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < Math.floor(doc.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"} />)}
                      <span className="text-xs text-muted-foreground ml-1">{doc.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{doc.bio}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{doc.patients} patients</span>
                      <Link to="/book" className="inline-flex items-center text-xs font-medium text-primary gap-1">
                        Book <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Doctor Spotlight */}
      <section className="py-20 bg-muted/50">
        <div className="container-main">
          <div className="rounded-2xl bg-card border border-border p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
              <img src={doctorSarah} alt="Dr. Sarah Chen" className="w-full h-full object-cover" loading="lazy" width={512} height={640} />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary mb-1">Featured Specialist</p>
              <h2 className="text-2xl font-bold text-foreground mb-2">Dr. Sarah Chen — Cardiology</h2>
              <div className="flex items-center gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}<span className="text-sm text-muted-foreground ml-2">4.9 (342 patients)</span></div>
              <p className="text-muted-foreground mb-4">Board-certified cardiologist with 15+ years of experience in interventional cardiology. Pioneer in minimally invasive cardiac procedures with nationally recognized research contributions.</p>
              <Link to="/book" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Book with Dr. Chen <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-teal-700 to-emerald-600 text-center">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-white mb-4">Find the Right Specialist for You</h2>
          <Link to="/book" className="inline-flex px-8 py-3.5 rounded-lg bg-white text-teal-700 font-semibold hover:bg-teal-50 transition-colors">Book Appointment</Link>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
