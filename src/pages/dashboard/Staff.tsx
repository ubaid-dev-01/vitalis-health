import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Trash2, Check } from "lucide-react";
import { useData } from "@/context/DataContext";

const Staff = () => {
  const { staffList, addStaff, deleteStaff } = useData();
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({ name: "", role: "", department: "", schedule: "Mon-Fri", status: "Active", caseload: 50 });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.department) return;
    addStaff(form);
    setForm({ name: "", role: "", department: "", schedule: "Mon-Fri", status: "Active", caseload: 50 });
    setShowModal(false);
    setSuccessMsg("Staff member added successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Staff Management</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"><Plus size={14} /> Add Staff</button>
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
                {["Name", "Role", "Department", "Schedule", "Status", "Caseload", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staffList.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium text-foreground flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{s.avatar}</div>
                    {s.name}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{s.role}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.department}</td>
                  <td className="px-5 py-3 text-muted-foreground">{s.schedule}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">{s.caseload}%</td>
                  <td className="px-5 py-3">
                    <button onClick={() => deleteStaff(s.id)} className="text-destructive hover:text-destructive/80"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Capacity */}
      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Doctor Capacity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.filter((s) => s.role.includes("Dr") || s.role.includes("ologist") || s.role.includes("Surgeon") || s.role.includes("Pediatrician")).map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <div className="relative w-20 h-20 mb-3">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                  <motion.path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke={s.caseload > 85 ? "#ef4444" : s.caseload > 70 ? "#f59e0b" : "#0f766e"}
                    strokeWidth="3" strokeLinecap="round"
                    initial={{ strokeDasharray: "0 100" }}
                    animate={{ strokeDasharray: `${s.caseload} ${100 - s.caseload}` }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">{s.caseload}%</div>
              </div>
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Add Staff Member</h3>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role (e.g. Cardiologist)" required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Department" required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <select value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
                {["Mon-Fri", "Mon-Thu", "Tue-Sat", "Mon-Wed", "Thu-Sun"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Add Staff</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Staff;
