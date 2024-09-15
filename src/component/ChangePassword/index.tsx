import { useRef } from "react";
import call from "../../utils/call";
import Button from "../../atom/Button";
import s from "./index.module.scss";
import { useLoading } from "../../hook/useLoading";

export default function ChangePassword({ setCpw }: { setCpw: Function }) {
  // cpw
  const pwLamaRef = useRef<HTMLInputElement>(null);
  const pwBaruRef = useRef<HTMLInputElement>(null);
  const { setLoading } = useLoading();
  function closeCpw() {
    setCpw(false);
  }

  async function submitCpw() {
    setLoading(true);
    const pwLama = pwLamaRef.current?.value;
    const pwBaru = pwBaruRef.current?.value;
    await call
      .post("/user/cpw", {
        oldPassword: pwLama,
        newPassword: pwBaru,
      })
      .then((res) => {
        if (res.success) {
          setLoading(false);
          alert(res.message);
          window.location.href = "/auth";
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => {
        setLoading(false);
        closeCpw();
      });
  }
  return (
    <div className={s.cpw}>
      <div className={s.cpw__card}>
        <div className={s.cpw__card__header}>
          <h4>Change Password</h4>
          <Button onClick={closeCpw}>Tutup</Button>
        </div>
        <div className={s.cpw__card__content}>
          <div className={s.cpw__card__content__input}>
            <label htmlFor="oldPassword">Password lama</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              ref={pwLamaRef}
            />
          </div>
          <div className={s.cpw__card__content__input}>
            <label htmlFor="newPassword">Password baru</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              ref={pwBaruRef}
            />
          </div>
          <Button onClick={submitCpw}>Simpan</Button>
        </div>
      </div>
    </div>
  );
}
