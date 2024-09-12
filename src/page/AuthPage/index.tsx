import { useEffect, useRef, useState } from "react";
import s from "./index.module.scss";
import Button from "../../atom/Button";
import { useLoading } from "../../hook/useLoading";
import call from "../../utils/call";
import { ApiResponse } from "../../types";

type authTypes = "masuk" | "daftar";

type inputTypes = "nama" | "password";

interface userData {
  username: string;
  password: string;
}

export default function AuthPage() {
  const [authType, setAuthType] = useState<authTypes>("masuk");
  const [alert, setAlert] = useState<string | false>(false);
  const [ds, setDs] = useState<boolean>(false); // disable submit
  const [dt, setDt] = useState<boolean>(false); // disable toggle
  const [pv, setPv] = useState<boolean>(false); // password visible
  const [inputData, setInputData] = useState<userData>({
    username: "",
    password: "",
  });
  const { setLoading } = useLoading();

  const alertRef = useRef(null);

  const iconClass = {
    lock: "bx bxs-lock-alt",
    open: "bx bxs-lock-open-alt",
  };

  const toggleFunction = (type: authTypes) => {
    if (type === "masuk") {
      if (authType === "masuk") {
        return;
      } else {
        setAuthType("masuk");
      }
    } else if (type === "daftar") {
      if (authType === "daftar") {
        return;
      } else {
        setAuthType("daftar");
      }
    }
  };

  function togglePasswordVisible() {
    setPv((p) => !p);
  }

  function inputOnChange(event: any, type: inputTypes) {
    const { value } = event.target;
    let userCopy = { ...inputData };

    if (type === "nama") {
      if (value === "") {
        userCopy.username = "";
      } else {
        userCopy.username = value;
      }
    } else if (type === "password") {
      if (value === "") {
        userCopy.password = "";
      } else {
        userCopy.password = value;
      }
    }

    setInputData(userCopy);
  }

  async function submitHandler() {
    const { username, password } = inputData;
    try {
      setDt(true);
      setLoading(true);
      if (username || password) {
        // TODO: SUBMIT
        /*
        1. Cek authType
        2. Jika masuk, langsung hit API login
        3. Jika daftar, validasi username lalu password 8 karakter
        4. setelah daftar sukses langsung jalankan fungsi login
        5. Jika login sukses langsung alihkan ke callbackurl
        6. Jika login gagal, set alert message
        */
        if (authType === "masuk") {
          // Login
          const data: ApiResponse = await call.post("/auth/login", {
            username,
            password,
          });
          if (data.success) {
            window.location.href = "/";
          } else {
            console.log(data);
            setAlert(data.message);
          }
        } else {
          // Create
          const newUser: ApiResponse = await call.post("/user/create", {
            username,
            password,
          });
          if (newUser.success) {
            const data: ApiResponse = await call.post("/auth/login", {
              username,
              password,
            });
            if (data.success) {
              window.location.href = "/";
            } else {
              setAlert(data.message);
            }
          } else {
            setAlert(newUser.message);
          }
        }
      } else {
        throw "Input nama dan password tidak boleh kosong";
      }
    } catch (error: any) {
      setAlert(error);
    } finally {
      setLoading(false);
      setDt(false);
    }
  }

  useEffect(() => {
    if (inputData.username && inputData.password) {
      setDs(false);
    } else {
      setDs(true);
    }
  }, [inputData]);

  useEffect(() => {
    if (!alertRef.current) {
      return;
    }

    let alertElement: HTMLElement = alertRef.current;

    if (alertElement.classList.contains("running")) {
      return;
    }

    alertElement.classList.add("running");
    const timer = setTimeout(() => {
      alertElement.classList.add(s.c__card__alert__close);
      setTimeout(() => {
        alertElement.classList.remove("running");
        setAlert(false);
      }, 500);
    }, 5500);

    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className={s.c}>
      <div className={s.c__card}>
        <div className={s.c__card__toggle}>
          <div
            onClick={() => !dt && toggleFunction("masuk")}
            className={`${s.c__card__toggle__option} ${
              authType === "masuk" && s.textPrimary
            }`}
          >
            Masuk
          </div>
          <div
            onClick={() => !dt && toggleFunction("daftar")}
            className={`${s.c__card__toggle__option} ${
              authType === "daftar" && s.textPrimary
            }`}
          >
            Daftar
          </div>
          <div
            className={`${s.c__card__toggle__background} ${
              authType === "daftar" && s.c__card__toggle__background__right
            }`}
          ></div>
        </div>
        <div className={s.c__card__input}>
          <div className={s.c__card__input__w}>
            <label htmlFor="nama">Nama</label>
            <div className={s.c__card__input__w__w}>
              <input
                type="text"
                name="nama"
                id="nama"
                placeholder="Masukkan Nama"
                onChange={(e) => inputOnChange(e, "nama")}
              />
            </div>
          </div>
          <div className={s.c__card__input__w}>
            <label htmlFor="password">Password</label>
            <div className={s.c__card__input__w__w}>
              <input
                type={pv ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Masukkan Password"
                onChange={(e) => inputOnChange(e, "password")}
              />
              <div
                className={s.c__card__input__w__lock}
                onClick={togglePasswordVisible}
              >
                <i className={pv ? iconClass.open : iconClass.lock}></i>
              </div>
            </div>
          </div>
        </div>
        {alert && (
          <div className={s.c__card__alert} ref={alertRef}>
            <i className="bx bx-error-circle"></i> {alert}
          </div>
        )}
        <Button
          className={`${s.c__card__button} ${
            ds && s.c__card__button__disabled
          }`}
          title={ds ? "Masukkan Nama dan Password" : ""}
          disabled={ds}
          onClick={submitHandler}
        >
          {authType === "masuk" ? "Masuk" : "Daftar"}
        </Button>
        <p>
          Dengan {authType === "masuk" ? "login" : "mendaftar"} saya menyetujui
          penggunaan cookies
        </p>
      </div>
    </div>
  );
}
