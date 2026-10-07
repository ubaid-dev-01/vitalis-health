import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Plus, Trash2, Check } from "lucide-react";
import { useData } from "@/context/DataContext";
import { doctors } from "@/data/mockData";

const Patients = () => {
  const { patientsList, addPatient, deletePatient } = useData();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof patientsList[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({ name: "", age: "", condition: "", doctor: "", status: "Active" });

  const filtered = patientsList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.condition || !form.doctor) return;
    addPatient({
      name: form.name,
      age: parseInt(form.age),
      condition: form.condition,
      doctor: form.doctor,
      status: form.status,
      lastVisit: new Date().toISOString().split("T")[0],
    });
    setForm({ name: "", age: "", condition: "", doctor: "", status: "Active" });
    setShowModal(false);
    setSuccessMsg("Patient added successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-foreground">Patients</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
            <Search size={14} className="text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patients..."
              className="text-sm bg-transparent text-foreground placeholder-muted-foreground focus:outline-none w-48" />
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"><Plus size={14} /> Add Patient</button>
        </div>
      </div>

      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <Check size={16} /> {successMsg}
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: patientsList.length },
          { label: "Active", value: patientsList.filter((p) => p.status === "Active").length },
          { label: "Follow-up", value: patientsList.filter((p) => p.status === "Follow-up").length },
          { label: "Critical", value: patientsList.filter((p) => p.status === "Critical").length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Patient", "ID", "Age", "Condition", "Doctor", "Last Visit", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30 cursor-pointer">
                  <td className="px-5 py-3 font-medium text-foreground flex items-center gap-2" onClick={() => setSelected(p)}>
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{p.avatar}</div>
                    {p.name}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{p.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.age}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.condition}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.doctor}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.lastVisit}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === "Active" ? "bg-emerald-100 text-emerald-700" : p.status === "Critical" ? "bg-red-100 text-red-700" : p.status === "Discharged" ? "bg-slate-100 text-slate-700" : "bg-amber-100 text-amber-700"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={(e) => { e.stopPropagation(); deletePatient(p.id); }} className="text-destructive hover:text-destructive/80"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-8 text-center text-muted-foreground">No patients found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Add Patient</h3>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age" required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} placeholder="Condition" required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
                <option value="">Select Doctor</option>
                {doctors.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
                {["Active", "Follow-up", "Critical", "Discharged"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Add Patient</button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Detail Panel */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex justify-end" onClick={() => setSelected(null)}>
            <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
              onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-card h-full border-l border-border p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Patient Details</h3>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-xl font-bold text-primary">{selected.avatar}</div>
                <h4 className="font-semibold text-foreground">{selected.name}</h4>
                <p className="text-sm text-muted-foreground">{selected.id}</p>
              </div>
              <div className="space-y-4">
                {[
                  ["Age", selected.age.toString()],
                  ["Condition", selected.condition],
                  ["Doctor", selected.doctor],
                  ["Last Visit", selected.lastVisit],
                  ["Status", selected.status],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Patients;
