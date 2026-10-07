import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ChevronDown, Send, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollTop } from "@/hooks/useScrollTop";
import contactHero from "@/assets/contact-hero-v2.jpg";

const faqs = [
  { q: "What insurance plans do you accept?", a: "We accept most major insurance plans including BlueCross, Aetna, Cigna, UnitedHealth, and Humana. Contact us for specific plan verification." },
  { q: "How do I schedule an appointment?", a: "You can book online through our website, call us at +1 (555) 123-4567, or visit our reception desk during business hours." },
  { q: "What are your operating hours?", a: "We operate Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM. Emergency services are available 24/7." },
  { q: "Do you offer telemedicine consultations?", a: "Yes, we offer virtual consultations for eligible appointments. Ask about telehealth options when booking." },
  { q: "What should I bring to my first visit?", a: "Please bring your photo ID, insurance card, list of current medications, and any relevant medical records or referral letters." },
];

const Contact = () => {
  useScrollTop();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={contactHero} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-teal-900/80 to-slate-900/85" />
        <div className="container-main text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl lg:text-5xl font-bold text-white mb-4">Get in Touch</motion.h1>
          <p className="text-slate-300 max-w-xl mx-auto">We'd love to hear from you. Reach out to us anytime.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: MapPin, title: "Visit Us", detail: "123 Medical Center Dr, Suite 100, Healthcare City, HC 10001", href: "https://maps.google.com/?q=123+Medical+Center+Dr+Suite+100+Healthcare+City" },
              { icon: Phone, title: "Call Us", detail: "+1 (555) 123-4567", href: "tel:+15551234567" },
              { icon: Mail, title: "Email Us", detail: "info@vitalishealth.com", href: "mailto:info@vitalishealth.com" },
            ].map((c) => (
              <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noreferrer" : undefined} className="p-6 rounded-xl bg-card border border-border card-hover text-center block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <c.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.detail}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="rounded-2xl bg-muted/50 h-80 lg:h-auto flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin size={40} className="text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Map</p>
                <p className="text-xs text-muted-foreground">123 Medical Center Dr</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..." required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="container-main max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl bg-card border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-medium text-foreground text-sm">{faq.q}</span>
                  <ChevronDown size={18} className={`text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background border-t border-border">
        <div className="container-main text-center">
          <p className="text-muted-foreground text-sm mb-4">Quick actions</p>
          <div className="flex justify-center gap-4">
            <a href="tel:+15551234567" className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">Call Us</a>
            <a href="mailto:info@vitalishealth.com" className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">Email Us</a>
            <Link to="/book" className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">Book Online</Link>
            <a href="https://maps.google.com/?q=123+Medical+Center+Dr+Suite+100+Healthcare+City" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">Directions</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
