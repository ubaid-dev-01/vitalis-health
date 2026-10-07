import { motion } from "framer-motion";
import { useData } from "@/context/DataContext";
import { kpiData, doctors, revenueData } from "@/data/mockData";
import { Users, CalendarDays, DollarSign, Star, AlertTriangle, TrendingUp, Plus, FileText, UserPlus, BarChart3, Activity } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(value);
  useEffect(() => {
    const prev = ref.current;
    ref.current = value;
    let start = prev;
    const step = (value - prev) / 30;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      start += step;
      if (frame >= 30) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{prefix}{display.toLocaleString()}{suffix}</>;
};

const Overview = () => {
  const { isLive, appointmentsList, inventoryList, patientsList } = useData();
  const data = isLive ? kpiData.live : kpiData.mock;

  const recentActivity = [
    ...(appointmentsList.slice(0, 2).map((a) => ({ id: `apt-${a.id}`, action: "Appointment scheduled", detail: `${a.patient} with ${a.doctor}`, time: "Recent", type: "appointment" }))),
    ...(patientsList.slice(0, 2).map((p) => ({ id: `pat-${p.id}`, action: "Patient registered", detail: `${p.name} — ${p.condition}`, time: "Recent", type: "patient" }))),
  ];

  const kpis = [
    { label: "Total Patients", value: patientsList.length > 0 ? patientsList.length : data.patients, icon: Users, color: "text-primary" },
    { label: "Today's Appointments", value: appointmentsList.length > 0 ? appointmentsList.length : data.appointments, icon: CalendarDays, color: "text-secondary" },
    { label: "Revenue This Month", value: data.revenue, icon: DollarSign, prefix: "$", color: "text-emerald-500" },
    { label: "Avg Patient Rating", value: data.rating, icon: Star, suffix: "/5", color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{kpi.label}</span>
              <kpi.icon size={18} className={kpi.color} />
            </div>
            <div className="text-2xl font-bold text-foreground">
              <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-primary" /> Revenue vs Target</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#0f766e" fill="url(#revGrad)" name="Revenue" />
              <Area type="monotone" dataKey="target" stroke="#10b981" fill="none" strokeDasharray="5 5" name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-primary" /> Profit vs Expense</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#0f766e" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="expense" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><CalendarDays size={16} className="text-primary" /> Upcoming Appointments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Patient", "Doctor", "Time", "Type", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appointmentsList.slice(0, 5).map((apt) => (
                <tr key={apt.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium text-foreground">{apt.patient}</td>
                  <td className="px-5 py-3 text-muted-foreground">{apt.doctor}</td>
                  <td className="px-5 py-3 text-muted-foreground">{apt.time}</td>
                  <td className="px-5 py-3 text-muted-foreground">{apt.type}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${apt.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" : apt.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Inventory Alerts */}
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><AlertTriangle size={16} className="text-amber-500" /> Inventory Alerts</h3>
          <div className="space-y-3">
            {inventoryList.filter((i) => i.status !== "Normal").length === 0 ? (
              <p className="text-sm text-muted-foreground">All inventory levels are normal.</p>
            ) : (
              inventoryList.filter((i) => i.status !== "Normal").map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.item}</p>
                    <p className="text-xs text-muted-foreground">{item.stock} {item.unit} remaining</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.status === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Doctors */}
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Star size={16} className="text-amber-400" /> Top Performing Doctors</h3>
          <div className="space-y-3">
            {doctors.slice(0, 4).map((doc) => (
              <div key={doc.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{doc.image}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.specialty} · {doc.patients} patients</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium text-foreground">{doc.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Activity size={16} className="text-primary" /> Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{act.action}</p>
                  <p className="text-xs text-muted-foreground">{act.detail}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Plus, label: "New Appointment", to: "/dashboard/appointments" },
              { icon: UserPlus, label: "Add Patient", to: "/dashboard/patients" },
              { icon: FileText, label: "Generate Invoice", to: "/dashboard/billing" },
              { icon: BarChart3, label: "View Reports", to: "/dashboard" },
            ].map((action) => (
              <Link key={action.label} to={action.to}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-primary/5 border border-border transition-colors">
                <action.icon size={20} className="text-primary" />
                <span className="text-xs font-medium text-foreground text-center">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
