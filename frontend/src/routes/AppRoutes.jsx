import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Doctor from "../pages/Doctor";
import Gallery from "../pages/Gallery";
import ServiceDetail from "../pages/ServiceDetail";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
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
          </Route>
        </AuthProvider>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
