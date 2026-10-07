import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, CalendarDays, List, X, Trash2, Check } from "lucide-react";
import { doctors } from "@/data/mockData";
import { useData } from "@/context/DataContext";

const Appointments = () => {
  const { appointmentsList, addAppointment, deleteAppointment, updateAppointmentStatus } = useData();
  const [view, setView] = useState<"list" | "calendar">("list");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({ patient: "", doctor: "", date: "", time: "", type: "Check-up" });

  const filtered = appointmentsList.filter((a) =>
    a.patient.toLowerCase().includes(search.toLowerCase()) || a.doctor.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.doctor || !form.date || !form.time) return;
    addAppointment({ ...form, status: "Pending" });
    setForm({ patient: "", doctor: "", date: "", time: "", type: "Check-up" });
    setShowModal(false);
    setSuccessMsg("Appointment added successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-foreground">Appointments</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
            <Search size={14} className="text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
              className="text-sm bg-transparent text-foreground placeholder-muted-foreground focus:outline-none w-32" />
          </div>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button onClick={() => setView("list")} className={`px-3 py-2 text-sm ${view === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}><List size={14} /></button>
            <button onClick={() => setView("calendar")} className={`px-3 py-2 text-sm ${view === "calendar" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}><CalendarDays size={14} /></button>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"><Plus size={14} /> Add</button>
        </div>
      </div>

      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <Check size={16} /> {successMsg}
        </motion.div>
      )}

      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Patient", "Doctor", "Date", "Time", "Type", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium text-foreground">{apt.patient}</td>
                  <td className="px-5 py-3 text-muted-foreground">{apt.doctor}</td>
                  <td className="px-5 py-3 text-muted-foreground">{apt.date}</td>
                  <td className="px-5 py-3 text-muted-foreground">{apt.time}</td>
                  <td className="px-5 py-3 text-muted-foreground">{apt.type}</td>
                  <td className="px-5 py-3">
                    <select value={apt.status} onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium border-0 focus:outline-none cursor-pointer ${apt.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" : apt.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => deleteAppointment(apt.id)} className="text-destructive hover:text-destructive/80"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Availability */}
      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Doctor Availability</h3>
        <div className="space-y-3">
          {doctors.slice(0, 6).map((doc) => {
            const pct = (doc.availability / doc.maxSlots) * 100;
            const color = pct > 80 ? "bg-red-500" : pct > 50 ? "bg-amber-500" : "bg-primary";
            return (
              <div key={doc.id} className="flex items-center gap-4">
                <span className="text-sm text-foreground w-40 truncate">{doc.name}</span>
                <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${color}`} />
                </div>
                <span className="text-xs text-muted-foreground w-20 text-right">{doc.availability}/{doc.maxSlots} slots</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Add Appointment</h3>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <input type="text" value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} placeholder="Patient Name" required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
                <option value="">Select Doctor</option>
                {doctors.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
                {["Check-up", "Follow-up", "Consultation", "Surgery Prep", "Prenatal", "Treatment", "Emergency"].map((t) => <option key={t}>{t}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none" />
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Add Appointment</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
