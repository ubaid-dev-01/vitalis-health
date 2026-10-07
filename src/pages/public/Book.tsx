import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Calendar, User, FileText, ArrowLeft } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";
import { services, doctors } from "@/data/mockData";
import bookHero from "@/assets/book-hero-v2.jpg";

const steps = ["Select Service", "Choose Doctor & Time", "Patient Details", "Confirmation"];

const Book = () => {
  useScrollTop();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ service: "", doctor: "", date: "", time: "", name: "", email: "", phone: "", notes: "" });

  const filteredDoctors = form.service ? doctors.filter((d) => d.specialty === form.service) : doctors;

  const next = () => step < 3 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative pt-32 pb-12 overflow-hidden">
        <img src={bookHero} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-teal-900/80 to-slate-900/85" />
        <div className="container-main text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl lg:text-4xl font-bold text-white mb-4">Book Your Appointment</motion.h1>
          <p className="text-slate-300">Complete the steps below to schedule your visit.</p>
        </div>
      </section>

      <div className="container-main py-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <span className="text-xs mt-2 text-muted-foreground hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-12 sm:w-20 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"><FileText size={20} className="text-primary" /> Select a Service</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((svc) => (
                    <button key={svc.id} onClick={() => { setForm({ ...form, service: svc.name }); next(); }}
                      className={`p-4 rounded-xl border text-left transition-all card-hover ${form.service === svc.name ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                      <h3 className="font-semibold text-foreground">{svc.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{svc.description.slice(0, 60)}...</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"><Calendar size={20} className="text-primary" /> Choose Doctor & Time</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Doctor</label>
                    <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">Select a doctor</option>
                      {filteredDoctors.map((d) => <option key={d.id} value={d.name}>{d.name} — {d.specialty}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Time</label>
                      <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option value="">Select time</option>
                        {["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"].map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1"><ArrowLeft size={14} /> Back</button>
                  <button onClick={next} disabled={!form.doctor || !form.date || !form.time} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1">Continue <ChevronRight size={14} /></button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"><User size={20} className="text-primary" /> Patient Details</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Notes (Optional)</label>
                    <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Any additional information..."
                      className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-1"><ArrowLeft size={14} /> Back</button>
                  <button onClick={next} disabled={!form.name || !form.email || !form.phone} className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1">Confirm Booking <ChevronRight size={14} /></button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Check size={36} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Appointment Confirmed!</h2>
                <p className="text-muted-foreground mb-8">Thank you, {form.name}. Your appointment has been scheduled.</p>
                <div className="max-w-sm mx-auto rounded-xl bg-muted/50 border border-border p-6 text-left space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Service:</span><span className="font-medium text-foreground">{form.service}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Doctor:</span><span className="font-medium text-foreground">{form.doctor}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date:</span><span className="font-medium text-foreground">{form.date}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Time:</span><span className="font-medium text-foreground">{form.time}</span></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Book;
