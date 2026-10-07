import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import VitalisLogo from "../VitalisLogo";

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300">
    <div className="container-main py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-4"><VitalisLogo size={36} /></div>
          <p className="text-sm text-slate-400 leading-relaxed">Providing exceptional healthcare services with compassion, innovation, and a commitment to extraordinary outcomes for every patient.</p>
          <div className="flex gap-3 mt-6">
            <a href="tel:+15551234567" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Call Vitalis Health"><Phone size={16} /></a>
            <a href="mailto:info@vitalishealth.com" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Email Vitalis Health"><Mail size={16} /></a>
            <a href="https://maps.google.com/?q=123+Medical+Center+Dr+Suite+100+Healthcare+City" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Open location in maps"><MapPin size={16} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          {[["Home", "/"], ["About Us", "/about"], ["Our Doctors", "/doctors"], ["Book Appointment", "/book"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={path} to={path} className="block text-sm text-slate-400 hover:text-primary transition-colors mb-2">{label}</Link>
          ))}
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          {["Cardiology", "Neurology", "Oncology", "Orthopedics", "Pediatrics", "Women's Health"].map((s) => (
            <Link key={s} to="/services" className="block text-sm text-slate-400 hover:text-primary transition-colors mb-2">{s}</Link>
          ))}
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Info</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3"><MapPin size={16} className="text-primary mt-0.5 shrink-0" /><span className="text-sm text-slate-400">123 Medical Center Dr, Suite 100, Healthcare City, HC 10001</span></div>
            <div className="flex items-center gap-3"><Phone size={16} className="text-primary shrink-0" /><span className="text-sm text-slate-400">+1 (555) 123-4567</span></div>
            <div className="flex items-center gap-3"><Mail size={16} className="text-primary shrink-0" /><span className="text-sm text-slate-400">info@vitalishealth.com</span></div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-slate-800">
      <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© 2024 Vitalis Health. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/about" className="text-sm text-slate-500 hover:text-slate-300">About Us</Link>
          <Link to="/contact" className="text-sm text-slate-500 hover:text-slate-300">Contact Support</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
