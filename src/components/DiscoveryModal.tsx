import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const DiscoveryModal = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("vitalis_modal_shown")) return;
    if (location.pathname === "/" || location.pathname === "/book" || location.pathname.startsWith("/blog")) return;
    const timer = setTimeout(() => setShow(true), 9000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const close = () => {
    setShow(false);
    localStorage.setItem("vitalis_modal_shown", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl p-8 w-full max-w-md relative text-white"
          >
            <button onClick={close} className="absolute top-4 right-4 text-white/60 hover:text-white"><X size={20} /></button>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🩺</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Free 15-min Discovery Call</h3>
              <p className="text-sm text-white/70">Speak with a healthcare specialist about your needs — completely free.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); close(); navigate("/book"); }} className="space-y-3">
              <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-primary" />
              <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-primary" />
              <input type="tel" placeholder="Phone Number" required className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-primary" />
              <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                Continue to Booking
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscoveryModal;
