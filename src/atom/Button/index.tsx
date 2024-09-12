import { ReactNode } from "react";
import s from "./index.module.scss";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: "primary" | "secondary" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  className,
  type = "primary",
  disabled = false,
  title,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${s.default} ${className} ${s[type]}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}
