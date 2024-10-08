import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import Test from "./Test.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPanel from "./page/AdminPanel/index.tsx";
import Navbar from "./component/Navbar/index.tsx";
import Landing from "./page/Landing/index.tsx";
import PrivateRoute from "./component/PrivateRoute/index.tsx";
import { LoadingProvider } from "./context/loadingContext.tsx";
import AuthPage from "./page/AuthPage/index.tsx";
import UserPanel from "./page/UserPanel/index.tsx";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute path="/admin">
        <AdminPanel />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute path="/dashboard">
        <UserPanel />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <div>not found</div>,
  },
]);

const disableNavbar: string[] = ["auth"];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      {!disableNavbar.some((path) =>
        window.location.pathname.startsWith(`/${path}`)
      ) && <Navbar />}
      <RouterProvider router={router} />
    </LoadingProvider>
  </StrictMode>
);
