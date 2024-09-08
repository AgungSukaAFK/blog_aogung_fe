import { ReactNode } from "react";
import s from "./index.module.scss";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "primary" | "secondary" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  className,
  type = "primary",
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${s.default} ${className} ${s[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
