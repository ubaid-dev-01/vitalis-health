import { useState } from "react";
import { Bell, Save, Check } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const Settings = () => {
  const { inventoryList, restockItem } = useData();
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState({ name: user?.name || "Dr. Admin", email: user?.email || "admin@vitalishealth.com", phone: "+1 (555) 123-4567" });
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, appointments: true, billing: true, inventory: true });
  const [successMsg, setSuccessMsg] = useState("");

  const showSuccess = (msg: string) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(""), 3000); };

  const handleSaveProfile = () => {
    updateProfile({ name: profile.name, email: profile.email });
    showSuccess("Profile settings saved!");
  };

  const testNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification("Vitalis Health", { body: "Push notifications are working!", icon: "/logo.png" });
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Settings</h1>

      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <Check size={16} /> {successMsg}
        </motion.div>
      )}

      {/* Profile */}
      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Profile Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone</label>
            <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Timezone</label>
            <select className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
              <option>Eastern (UTC-5)</option><option>Central (UTC-6)</option><option>Pacific (UTC-8)</option>
            </select>
          </div>
        </div>
        <button onClick={handleSaveProfile} className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"><Save size={14} /> Save Changes</button>
      </div>

      {/* Notifications */}
      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-foreground capitalize">{key} Notifications</span>
              <button onClick={() => { setNotifications({ ...notifications, [key]: !val }); showSuccess(`${key} notifications ${!val ? "enabled" : "disabled"}`); }}
                className={`relative w-10 h-5 rounded-full transition-colors ${val ? "bg-primary" : "bg-muted"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-card shadow transition-transform ${val ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={testNotification}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Bell size={14} /> Test Push Notification
        </button>
      </div>

      {/* System Preferences */}
      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">System Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Date Format</label>
            <select className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
              <option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Language</label>
            <select className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
              <option>English</option><option>Spanish</option><option>French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="p-5 border-b border-border"><h3 className="text-sm font-semibold text-foreground">Inventory Management</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Item", "Stock", "Threshold", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventoryList.map((item) => (
                <tr key={item.id} className={`hover:bg-muted/30 ${item.status === "Critical" ? "bg-red-50/50" : ""}`}>
                  <td className="px-5 py-3 font-medium text-foreground">{item.item}</td>
                  <td className="px-5 py-3 text-foreground">{item.stock} {item.unit}</td>
                  <td className="px-5 py-3 text-muted-foreground">{item.threshold}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.status === "Normal" ? "bg-emerald-100 text-emerald-700" : item.status === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => { restockItem(item.id, 50); showSuccess(`${item.item} restocked!`); }}
                      className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20">Restock</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
