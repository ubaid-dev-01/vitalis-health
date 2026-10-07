import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, CalendarDays, Users, CreditCard, UserCog, Settings,
  ChevronLeft, ChevronRight, Bell, Search, LogOut, Menu, X
} from "lucide-react";
import VitalisLogo from "@/components/VitalisLogo";

const sidebarItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/dashboard/appointments", icon: CalendarDays, label: "Appointments" },
  { path: "/dashboard/patients", icon: Users, label: "Patients" },
  { path: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  { path: "/dashboard/staff", icon: UserCog, label: "Staff" },
  { path: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const mockNotifications = [
  { id: 1, text: "New appointment booked by Sarah Johnson", time: "2 min ago", read: false },
  { id: 2, text: "Patient record updated for Michael Brown", time: "15 min ago", read: false },
  { id: 3, text: "Invoice #INV-1047 has been paid", time: "1 hr ago", read: true },
  { id: 4, text: "Low stock alert: Surgical Gloves", time: "2 hrs ago", read: false },
  { id: 5, text: "Staff meeting scheduled for tomorrow 9 AM", time: "3 hrs ago", read: true },
];

const DashboardLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!isAuthenticated) return <Navigate to="/staff-login" replace />;

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Desktop */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        className="hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border shrink-0"
      >
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {!collapsed && <VitalisLogo size={28} showText={false} />}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent"}`}
                title={collapsed ? item.label : undefined}>
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-xs font-bold text-sidebar-primary-foreground shrink-0">{user?.avatar}</div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">{user?.name}</p>
                <button onClick={logout} className="text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground flex items-center gap-1"><LogOut size={10} /> Logout</button>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)} className="fixed inset-0 z-50 bg-foreground/50 lg:hidden">
            <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              onClick={(e) => e.stopPropagation()} className="w-60 h-full bg-sidebar flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
                <VitalisLogo size={28} />
                <button onClick={() => setMobileOpen(false)} className="text-sidebar-foreground"><X size={18} /></button>
              </div>
              <nav className="flex-1 p-2 space-y-1">
                {sidebarItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent"}`}>
                      <item.icon size={18} /><span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-sidebar-border">
                <button onClick={logout} className="flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground"><LogOut size={14} /> Logout</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-4 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-foreground"><Menu size={20} /></button>
          <h2 className="text-sm font-semibold text-foreground hidden sm:block">Vitalis Admin</h2>
          <div className="flex-1 max-w-sm mx-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
            <Search size={14} className="text-muted-foreground" />
            <input type="text" placeholder="Search..." className="flex-1 text-sm bg-transparent text-foreground placeholder-muted-foreground focus:outline-none" />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 text-muted-foreground hover:text-foreground">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-card border border-border shadow-lg z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Notifications</span>
                      <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-border">
                      {mockNotifications.map((n) => (
                        <div key={n.id} className={`px-4 py-3 text-sm ${n.read ? "bg-card" : "bg-primary/5"}`}>
                          <p className="text-foreground">{n.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{user?.avatar}</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
