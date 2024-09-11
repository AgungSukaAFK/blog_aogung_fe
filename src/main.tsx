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
      <PrivateRoute>
        <AdminPanel />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <div>not found</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <Navbar />
      <RouterProvider router={router} />
    </LoadingProvider>
  </StrictMode>
);
