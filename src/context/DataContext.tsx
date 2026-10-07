import { createContext, useContext, useState, ReactNode } from "react";
import {
  appointments as initialAppointments,
  patients as initialPatients,
  staff as initialStaff,
  invoices as initialInvoices,
  inventory as initialInventory,
} from "@/data/mockData";

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  time: string;
  date: string;
  type: string;
  status: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  status: string;
  doctor: string;
  avatar: string;
}

interface StaffMember {
  id: number;
  name: string;
  role: string;
  department: string;
  status: string;
  schedule: string;
  caseload: number;
  avatar: string;
}

interface Invoice {
  id: string;
  patient: string;
  amount: number;
  date: string;
  status: string;
}

interface InventoryItem {
  id: number;
  item: string;
  stock: number;
  unit: string;
  threshold: number;
  status: string;
}

interface DataContextType {
  isLive: boolean;
  toggleMode: () => void;
  isLoading: boolean;
  // Appointments CRUD
  appointmentsList: Appointment[];
  addAppointment: (apt: Omit<Appointment, "id">) => void;
  deleteAppointment: (id: number) => void;
  updateAppointmentStatus: (id: number, status: string) => void;
  // Patients CRUD
  patientsList: Patient[];
  addPatient: (p: Omit<Patient, "id" | "avatar">) => void;
  deletePatient: (id: string) => void;
  updatePatient: (id: string, data: Partial<Patient>) => void;
  // Staff CRUD
  staffList: StaffMember[];
  addStaff: (s: Omit<StaffMember, "id" | "avatar">) => void;
  deleteStaff: (id: number) => void;
  // Invoices
  invoicesList: Invoice[];
  addInvoice: (inv: Invoice) => void;
  // Inventory
  inventoryList: InventoryItem[];
  restockItem: (id: number, qty: number) => void;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLive((prev) => !prev);
      setIsLoading(false);
    }, 500);
  };

  // Appointments
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(initialAppointments);
  const addAppointment = (apt: Omit<Appointment, "id">) => {
    const newId = Math.max(...appointmentsList.map((a) => a.id), 0) + 1;
    setAppointmentsList((prev) => [{ id: newId, ...apt }, ...prev]);
  };
  const deleteAppointment = (id: number) => setAppointmentsList((prev) => prev.filter((a) => a.id !== id));
  const updateAppointmentStatus = (id: number, status: string) =>
    setAppointmentsList((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

  // Patients
  const [patientsList, setPatientsList] = useState<Patient[]>(initialPatients);
  const addPatient = (p: Omit<Patient, "id" | "avatar">) => {
    const newId = `P-${1000 + patientsList.length + 1}`;
    const avatar = p.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    setPatientsList((prev) => [{ id: newId, avatar, ...p }, ...prev]);
  };
  const deletePatient = (id: string) => setPatientsList((prev) => prev.filter((p) => p.id !== id));
  const updatePatient = (id: string, data: Partial<Patient>) =>
    setPatientsList((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));

  // Staff
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const addStaff = (s: Omit<StaffMember, "id" | "avatar">) => {
    const newId = Math.max(...staffList.map((st) => st.id), 0) + 1;
    const avatar = s.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    setStaffList((prev) => [{ id: newId, avatar, ...s }, ...prev]);
  };
  const deleteStaff = (id: number) => setStaffList((prev) => prev.filter((s) => s.id !== id));

  // Invoices
  const [invoicesList, setInvoicesList] = useState<Invoice[]>(initialInvoices);
  const addInvoice = (inv: Invoice) => setInvoicesList((prev) => [inv, ...prev]);

  // Inventory
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(initialInventory);
  const restockItem = (id: number, qty: number) =>
    setInventoryList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: item.stock + qty, status: item.stock + qty >= item.threshold ? "Normal" : item.stock + qty >= item.threshold * 0.5 ? "Low" : "Critical" }
          : item
      )
    );

  return (
    <DataContext.Provider
      value={{
        isLive, toggleMode, isLoading,
        appointmentsList, addAppointment, deleteAppointment, updateAppointmentStatus,
        patientsList, addPatient, deletePatient, updatePatient,
        staffList, addStaff, deleteStaff,
        invoicesList, addInvoice,
        inventoryList, restockItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
