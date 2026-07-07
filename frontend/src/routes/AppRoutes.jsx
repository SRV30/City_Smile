import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Doctor from "../pages/Doctor";
import Gallery from "../pages/Gallery";
import ServiceDetail from "../pages/ServiceDetail";
import AdminLogin from "../pages/Admin/Login";
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminManagement from "../pages/Admin/AdminManagement";
import GalleryCMS from "../pages/Admin/GalleryCMS";
import HomepageCMS from "../pages/Admin/HomepageCMS";
import DoctorCMS from "../pages/Admin/DoctorCMS";
import ServicesCMS from "../pages/Admin/ServicesCMS";
import TestimonialsCMS from "../pages/Admin/TestimonialsCMS";
import FaqCMS from "../pages/Admin/FaqCMS";
import Appointments from "../pages/Admin/Appointments";
import Messages from "../pages/Admin/Messages";
import SettingsCMS from "../pages/Admin/SettingsCMS";
import NotFound from "../pages/NotFound";
import { AuthProvider } from "../context/AuthContext";

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el)
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          0,
        );
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollHandler />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
        </Route>

        <AuthProvider>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="admins" element={<AdminManagement />} />
            <Route path="gallery" element={<GalleryCMS />} />
            <Route path="homepage" element={<HomepageCMS />} />
            <Route path="doctor" element={<DoctorCMS />} />
            <Route path="services" element={<ServicesCMS />} />
            <Route path="testimonials" element={<TestimonialsCMS />} />
            <Route path="faq" element={<FaqCMS />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<SettingsCMS />} />
          </Route>
        </AuthProvider>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
