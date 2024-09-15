import { useRef } from "react";
import Button from "../../atom/Button";
import Container from "../../atom/Container";
import ThemeToggler from "../ThemeToggler";
import s from "./index.module.scss";
import { useAuth } from "../../hook/useAuth";

export default function Navbar() {
  const { user, loading } = useAuth();

  const url = window.location.pathname;
  const navs: Array<{ name: string; path: string }> = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Blogs",
      path: "/blogs",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  const mainRef = useRef<HTMLDivElement | null>(null);
  function hamburgerClick() {
    if (mainRef.current) {
      if (mainRef.current.classList) {
        mainRef.current.classList.toggle(s.show);
      }
    }
  }

  function dashboardButton() {
    if (user) {
      if (user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      window.location.href = "/auth";
    }
  }

  return (
    <div className={s.navbar}>
      <Container className={s.container}>
        <div className={s.logo}>
          <a href="/">
            AoGung<span>_</span>
          </a>
        </div>
        <div className={s.main} ref={mainRef}>
          <div className={s.navigation}>
            {navs.map((nav, index) => {
              return (
                <a
                  href={nav.path}
                  key={index}
                  className={
                    url.split("/")[1] === nav.path.split("/")[1] ? s.active : ""
                  }
                >
                  {nav.name}
                </a>
              );
            })}
          </div>
          <div className={s.option}>
            <ThemeToggler />
            <Button type="primary" onClick={dashboardButton}>
              <i className="bx bx-user-circle"></i>
              {loading ? "Loading..." : user ? "Dashboard" : "Login"}
            </Button>
          </div>
        </div>
        <i className={`bx bx-menu ${s.hamburger}`} onClick={hamburgerClick}></i>
      </Container>
    </div>
  );
}
