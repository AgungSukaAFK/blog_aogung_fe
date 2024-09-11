import { ReactNode } from "react";
import s from "./index.module.scss";
import Container from "../../atom/Container";
import Button from "../../atom/Button";

interface UserLayoutProps {
  children: ReactNode;
  type?: "admin" | "user";
}

export default function UserLayout({
  children,
  type = "user",
}: UserLayoutProps) {
  return (
    <div className={s.container}>
      <Container className={s.c}>
        <div className={s.c__side}></div>
        <div className={s.c__main}>
          <div className={s.c__main__content}>
            <div className={s.c__main__content__header}>
              <h3>{type === "admin" ? "Admin" : "User"} Panel</h3>
              <Button>Logout</Button>
            </div>
            {children}
          </div>
          <div className={s.c__main__option}></div>
        </div>
      </Container>
    </div>
  );
}
