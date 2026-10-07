import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Brain, Microscope, Bone, Baby, UserRound, Check, ChevronDown, Star, Shield, Award, ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { services, testimonials } from "@/data/mockData";
import { Link } from "react-router-dom";
import servicesHero from "@/assets/services-hero-v2.jpg";

const iconMap: Record<string, any> = { Heart, Brain, Microscope, Bone, Baby, UserRound };

const Services = () => {
  useScrollTop();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={servicesHero} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-teal-900/80 to-slate-900/85" />
        <div className="container-main text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Medical Services</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="text-lg text-slate-300 max-w-2xl mx-auto">Comprehensive healthcare solutions powered by expertise and cutting-edge technology.</motion.p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc) => {
              const Icon = iconMap[svc.icon] || Heart;
              const isOpen = expanded === svc.id;
              return (
                <motion.div key={svc.id} layout className="rounded-xl bg-card border border-border overflow-hidden card-hover">
                  <button onClick={() => setExpanded(isOpen ? null : svc.id)} className="w-full p-6 flex items-start gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{svc.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{svc.description}</p>
                    </div>
                    <ChevronDown size={20} className={`text-muted-foreground transition-transform mt-1 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 pt-0">
                          <div className="border-t border-border pt-4">
                            <p className="text-sm font-medium text-foreground mb-3">Key Features:</p>
                            <div className="space-y-2">
                              {svc.features.map((f) => (
                                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Check size={14} className="text-primary" /> {f}
                                </div>
                              ))}
                            </div>
                            <Link to="/book" className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary">
                              Book This Service <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container-main">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">Why Choose Vitalis Health?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Accredited Excellence", desc: "JCI accredited with the highest safety standards." },
              { icon: Award, title: "Award-Winning Care", desc: "Recognized by leading healthcare organizations." },
              { icon: Heart, title: "Patient-First Approach", desc: "Every decision centered around patient well-being." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-foreground mb-10">Patient Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="p-6 rounded-xl bg-card border border-border">
                <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}</div>
                <p className="text-sm text-muted-foreground italic mb-4">"{t.quote}"</p>
                <p className="font-medium text-foreground text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">Insurance Partners Accepted</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["BlueCross BlueShield", "Aetna", "Cigna", "UnitedHealth", "Humana", "Kaiser Permanente"].map((ins) => (
              <div key={ins} className="px-5 py-3 rounded-lg bg-card border border-border text-sm text-muted-foreground font-medium">{ins}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-teal-700 to-emerald-600 text-center">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Specialist Consultation?</h2>
          <p className="text-teal-100 mb-8">Book your appointment today and take the first step towards better health.</p>
          <Link to="/book" className="inline-flex px-8 py-3.5 rounded-lg bg-white text-teal-700 font-semibold hover:bg-teal-50 transition-colors">Book Appointment</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
