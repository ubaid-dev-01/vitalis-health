import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Printer, Check } from "lucide-react";
import { useData } from "@/context/DataContext";

const Billing = () => {
  const { patientsList, invoicesList, addInvoice } = useData();
  const [showInvoice, setShowInvoice] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [invoiceData, setInvoiceData] = useState({
    patient: "", checkup: "General Check-up", doctorFee: 500, opExpense: 200, taxRate: 8, notes: "",
  });
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null);

  const generateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = invoiceData.doctorFee + invoiceData.opExpense;
    const tax = subtotal * (invoiceData.taxRate / 100);
    const total = subtotal + tax;
    const inv = {
      id: `VH-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      date: new Date().toLocaleDateString(),
      ...invoiceData,
      subtotal, tax, total,
    };
    setGeneratedInvoice(inv);
    // Add to invoices list
    addInvoice({ id: inv.id, patient: inv.patient, amount: Math.round(total), date: new Date().toISOString().split("T")[0], status: "Unpaid" });
    setShowInvoice(true);
    setSuccessMsg("Invoice generated and added to records!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Billing & Invoices</h1>

      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <Check size={16} /> {successMsg}
        </motion.div>
      )}

      {/* Invoice Generator */}
      <div className="rounded-xl bg-card border border-border p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><FileText size={16} className="text-primary" /> Generate Invoice</h3>
        <form onSubmit={generateInvoice} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Patient Name</label>
            <select value={invoiceData.patient} onChange={(e) => setInvoiceData({ ...invoiceData, patient: e.target.value })} required
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
              <option value="">Select patient</option>
              {patientsList.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Check-up Type</label>
            <select value={invoiceData.checkup} onChange={(e) => setInvoiceData({ ...invoiceData, checkup: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none">
              {["General Check-up", "Specialist Consultation", "Surgery", "Lab Work", "Follow-up"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Doctor Fee ($)</label>
            <input type="number" value={invoiceData.doctorFee} onChange={(e) => setInvoiceData({ ...invoiceData, doctorFee: +e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Operational Expense ($)</label>
            <input type="number" value={invoiceData.opExpense} onChange={(e) => setInvoiceData({ ...invoiceData, opExpense: +e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Tax Rate (%)</label>
            <input type="number" value={invoiceData.taxRate} onChange={(e) => setInvoiceData({ ...invoiceData, taxRate: +e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Notes</label>
            <input type="text" value={invoiceData.notes} onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })} placeholder="Optional"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Generate Invoice</button>
          </div>
        </form>
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="p-5 border-b border-border"><h3 className="text-sm font-semibold text-foreground">Recent Invoices</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Invoice ID", "Patient", "Amount", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoicesList.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium text-foreground">{inv.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{inv.patient}</td>
                  <td className="px-5 py-3 text-foreground">${inv.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : inv.status === "Overdue" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      <AnimatePresence>
        {showInvoice && generatedInvoice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4" onClick={() => setShowInvoice(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card rounded-2xl border border-border p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Vitalis Health</h3>
                  <p className="text-xs text-muted-foreground">123 Medical Center Dr, Healthcare City</p>
                </div>
                <button onClick={() => setShowInvoice(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Invoice:</span><span className="font-medium text-foreground">{generatedInvoice.id}</span></div>
                <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Date:</span><span className="font-medium text-foreground">{generatedInvoice.date}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Patient:</span><span className="font-medium text-foreground">{generatedInvoice.patient}</span></div>
              </div>
              <table className="w-full text-sm mb-6">
                <thead><tr className="border-b border-border"><th className="text-left py-2 text-muted-foreground">Item</th><th className="text-right py-2 text-muted-foreground">Amount</th></tr></thead>
                <tbody>
                  <tr className="border-b border-border"><td className="py-2 text-foreground">{generatedInvoice.checkup}</td><td className="py-2 text-right text-foreground">—</td></tr>
                  <tr className="border-b border-border"><td className="py-2 text-foreground">Doctor Fee</td><td className="py-2 text-right text-foreground">${generatedInvoice.doctorFee.toLocaleString()}</td></tr>
                  <tr className="border-b border-border"><td className="py-2 text-foreground">Operational Expense</td><td className="py-2 text-right text-foreground">${generatedInvoice.opExpense.toLocaleString()}</td></tr>
                </tbody>
              </table>
              <div className="space-y-1 text-sm mb-6">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal:</span><span className="text-foreground">${generatedInvoice.subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax ({generatedInvoice.taxRate}%):</span><span className="text-foreground">${generatedInvoice.tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg border-t border-border pt-2"><span className="text-foreground">Total:</span><span className="text-primary">${generatedInvoice.total.toFixed(2)}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => window.print()} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2">
                  <Printer size={14} /> Print
                </button>
                <button onClick={() => setShowInvoice(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Billing;
