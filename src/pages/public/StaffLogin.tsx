import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import VitalisLogo from "@/components/VitalisLogo";
import { Loader2 } from "lucide-react";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-lg">
        <div className="flex justify-center mb-8"><VitalisLogo size={44} /></div>
        <h1 className="text-2xl font-bold text-foreground text-center mb-2">Staff Portal</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">Sign in to access the admin dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@vitalishealth.com"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button type="submit" disabled={loading || !email || !password}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Login to Dashboard"}
          </button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">Enter any email and password to access the demo dashboard.</p>
      </motion.div>
    </div>
  );
};

export default StaffLogin;
