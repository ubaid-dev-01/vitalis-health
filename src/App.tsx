import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/BackToTop";
import DiscoveryModal from "@/components/DiscoveryModal";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Services from "@/pages/public/Services";
import Doctors from "@/pages/public/Doctors";
import Book from "@/pages/public/Book";
import Blog from "@/pages/public/Blog";
import BlogPost from "@/pages/public/BlogPost";
import Contact from "@/pages/public/Contact";
import StaffLogin from "@/pages/public/StaffLogin";
import Overview from "@/pages/dashboard/Overview";
import Appointments from "@/pages/dashboard/Appointments";
import Patients from "@/pages/dashboard/Patients";
import Billing from "@/pages/dashboard/Billing";
import StaffPage from "@/pages/dashboard/Staff";
import Settings from "@/pages/dashboard/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
    <BackToTop />
    <DiscoveryModal />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
              <Route path="/doctors" element={<PublicLayout><Doctors /></PublicLayout>} />
              <Route path="/book" element={<PublicLayout><Book /></PublicLayout>} />
              <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
              <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/staff-login" element={<StaffLogin />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="patients" element={<Patients />} />
                <Route path="billing" element={<Billing />} />
                <Route path="staff" element={<StaffPage />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
