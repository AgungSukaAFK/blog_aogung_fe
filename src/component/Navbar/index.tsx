import Button from "../../atom/Button";
import Container from "../../atom/Container";
import ThemeToggler from "../ThemeToggler";
import s from "./index.module.scss";

export default function Navbar() {
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

  return (
    <div className={s.navbar}>
      <Container className={s.container}>
        <div className={s.logo}>
          <a href="/">
            AoGung<span>_</span>
          </a>
        </div>
        <div className={s.main}>
          <div className={s.navigation}>
            {navs.map((nav, index) => {
              return (
                <a
                  href={nav.path}
                  key={index}
                  className={nav.path === url ? s.active : ""}
                >
                  {nav.name}
                </a>
              );
            })}
          </div>
          <div className={s.option}>
            <ThemeToggler />
            <Button type="primary">
              <i className="bx bx-user-circle"></i>
              Dashboard
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}