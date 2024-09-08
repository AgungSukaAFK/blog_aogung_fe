import { ReactNode } from "react";
import "./index.css";

interface UserLayoutProps {
  children: ReactNode;
  type?: "admin" | "user";
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
