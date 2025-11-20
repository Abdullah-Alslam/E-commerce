import { useEffect, useState } from "react";
import axios from "axios";
import PageLoading from "./components/Loading/PageLoading";
import ForbiddenPage from "./components/Pages/403";
export default function ProtectedRoute({
  children,
  allowedRoles = ["user", "admin"],
}) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRole() {
      try {
        const res = await axios.get("/api/users/me", { withCredentials: true });
        setRole(res.data.role);
        console.log("the role is" ,res);
        
      } catch (err) {
        console.log(err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }
    checkRole();
  }, []);

  if (loading) return <PageLoading />;

  if (!role || !allowedRoles.includes(role)) return <ForbiddenPage />;

  return children;
}
