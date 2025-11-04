"use client";
import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import ForbiddenPage from '../Forbiddenpage'
export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(null); 
  const cookie = Cookie();

  useEffect(() => {
    const token = cookie.get("token");
    if (token) setAuthorized(true);
    else setAuthorized(false);
  }, []);

  if (authorized === null) return <div>Loading ....... </div>; 
  if (!authorized) return <ForbiddenPage />; 

  return children; 
}
