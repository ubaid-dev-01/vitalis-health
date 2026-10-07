import { motion } from "framer-motion";
import { Award, Heart, Shield, Users, Target, Lightbulb } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { leadershipTeam, timelineEvents } from "@/data/mockData";
import { Link } from "react-router-dom";
import aboutHero from "@/assets/about-hero-v2.jpg";
import patientStory from "@/assets/patient-story.jpg";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const values = [
  { icon: Heart, title: "Compassion", desc: "Every patient deserves empathy and understanding." },
  { icon: Shield, title: "Safety", desc: "Patient safety is our highest priority." },
  { icon: Target, title: "Excellence", desc: "We pursue the highest standards in everything." },
  { icon: Users, title: "Teamwork", desc: "Collaboration drives better outcomes." },
  { icon: Lightbulb, title: "Innovation", desc: "Embracing technology to advance care." },
  { icon: Award, title: "Integrity", desc: "Honest, transparent, and ethical care." },
];

const About = () => {
  useScrollTop();
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={aboutHero} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-teal-900/80 to-slate-900/85" />
        <div className="container-main text-center relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-teal-300 mb-3">About Vitalis Health</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-5xl font-bold text-white mb-4">Transforming Healthcare<br />Since 2000</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="text-lg text-slate-300 max-w-2xl mx-auto">Our mission is to provide accessible, compassionate, and innovative healthcare that empowers patients to live their healthiest lives.</motion.p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary mb-2">Leadership</p>
            <h2 className="text-3xl font-bold text-foreground">Meet Our Leadership Team</h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipTeam.map((member) => (
              <motion.div key={member.name} variants={fadeUp} className="rounded-xl bg-card border border-border p-6 card-hover text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                  {member.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/50">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary mb-2">Our Journey</p>
            <h2 className="text-3xl font-bold text-foreground">25 Years of Excellence</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0">
            {timelineEvents.map((event, i) => (
              <motion.div key={event.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="flex items-start gap-6 pb-10 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{event.year}</div>
                  {i < timelineEvents.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 mt-2" />}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "15,000+", label: "Patients Treated" },
              { value: "98.4%", label: "Satisfaction Rate" },
              { value: "120+", label: "Medical Staff" },
              { value: "50+", label: "Awards Won" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-muted/50">
        <div className="container-main text-center">
          <p className="text-sm font-semibold text-primary mb-2">Recognition</p>
          <h2 className="text-3xl font-bold text-foreground mb-10">Awards & Accreditations</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["JCI Gold Seal", "HIPAA Excellence", "Patient Safety Award", "Top Hospital 2024", "Digital Health Leader"].map((award) => (
              <div key={award} className="px-6 py-4 rounded-xl bg-card border border-border flex items-center gap-3 card-hover">
                <Award size={20} className="text-primary" />
                <span className="font-medium text-foreground text-sm">{award}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary mb-2">Our Values</p>
            <h2 className="text-3xl font-bold text-foreground">What Drives Us Forward</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-xl bg-card border border-border card-hover text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Story */}
      <section className="py-20 bg-muted/50">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">A Patient's Story</h2>
          <div className="max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden border border-border relative group cursor-pointer">
            <img src={patientStory} alt="Patient story" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <span className="text-white text-2xl ml-1">▶</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-700 to-emerald-600 text-center">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Vitalis Health Family</h2>
          <p className="text-teal-100 mb-8 max-w-xl mx-auto">Experience healthcare that puts you first.</p>
          <Link to="/book" className="inline-flex px-8 py-3.5 rounded-lg bg-white text-teal-700 font-semibold hover:bg-teal-50 transition-colors">Book Appointment</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
