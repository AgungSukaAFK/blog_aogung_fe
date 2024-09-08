import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import Test from "./Test.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPanel from "./page/AdminPanel/index.tsx";
import Navbar from "./component/Navbar/index.tsx";
import Landing from "./page/Landing/index.tsx";

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
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "*",
    element: <div>not found</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <head>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
    </head>
    <Navbar />
    <RouterProvider router={router} />
  </StrictMode>
);
