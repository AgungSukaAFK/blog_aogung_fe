import { ReactNode } from "react";
import s from "./index.module.scss";
import Container from "../../atom/Container";
import Button from "../../atom/Button";
import call from "../../utils/call";

interface UserLayoutProps {
  children: ReactNode;
  type?: "admin" | "user";
}

export default function UserLayout({
  children,
  type = "user",
}: UserLayoutProps) {
  async function logout() {
    await call
      .get("/auth/logout")
      .then((res) => {
        if (res.success) {
          window.location.href = "/";
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }
  return (
    <div className={s.container}>
      <Container className={s.c}>
        <div className={s.c__side}></div>
        <div className={s.c__main}>
          <div className={s.c__main__content}>
            <div className={s.c__main__content__header}>
              <h3>{type === "admin" ? "Admin" : "User"} Panel</h3>
              <Button onClick={logout}>Logout</Button>
            </div>
            {children}
          </div>
          <div className={s.c__main__option}></div>
        </div>
      </Container>
    </div>
  );
}
