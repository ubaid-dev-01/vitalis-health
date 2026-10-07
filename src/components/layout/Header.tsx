import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VitalisLogo from "../VitalisLogo";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/doctors", label: "Doctors" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur-md shadow-sm py-2 border-b border-border" : "bg-slate-900/60 backdrop-blur-md py-4"}`}>
      <div className="container-main flex items-center justify-between">
        <Link to="/">
          <VitalisLogo size={44} lightMode={!scrolled} />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-teal-400 ${
                location.pathname === link.path
                  ? scrolled ? "text-primary" : "text-teal-400"
                  : scrolled ? "text-foreground/80" : "text-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/staff-login" className={`text-sm font-medium transition-colors hover:text-teal-400 ${scrolled ? "text-foreground/70" : "text-white/80"}`}>
            Staff Login
          </Link>
          <Link to="/book" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Phone size={16} /> Book Appointment
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container-main py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`py-2 text-sm font-medium ${location.pathname === link.path ? "text-primary" : "text-foreground/70"}`}>
                  {link.label}
                </Link>
              ))}
              <Link to="/staff-login" className="py-2 text-sm font-medium text-foreground/70">Staff Login</Link>
              <Link to="/book" className="mt-2 text-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
