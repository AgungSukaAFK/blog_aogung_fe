import { useTheme } from "../../hook/useTheme";
import Button from "../../atom/Button";
import s from "./index.module.scss";

export default function ThemeToggler() {
  const options = {
    sun: <i className="bx bxs-sun"></i>,
    moon: <i className="bx bxs-moon"></i>,
  };

  const { theme, setTheme } = useTheme();

  return (
    <Button
      className={s.button}
      type="secondary"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? options.moon : options.sun} Theme
    </Button>
  );
}
