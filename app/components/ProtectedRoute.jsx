// "use client";

// import { useEffect, useState } from "react";
// import PageLoading from "../components/Loading/PageLoading";
// import UnauthorizedPage from "./Pages/401";

// export default function ProtectedRoute({ children }) {
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         const res = await fetch("/api/auth/check", { credentials: "include" });
//         if (res.ok) setAuthorized(true);
//         else setAuthorized(false);
//       } catch (err) {
//         console.error(err);
//         setAuthorized(false);
//       }
//     }

//     checkAuth();
//   }, []);

//   if (authorized === null) return <PageLoading />;
//   if (!authorized) return <UnauthorizedPage />;

//   return children;
// }
