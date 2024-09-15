import { useEffect, useState } from "react";
import call from "../utils/call";
import { UserModel } from "../types";

/*
    const { user, loading } = useAuth()

    user = userObject | false | null
    loading = true | false
    loading = true => user = null
    loading = false => user = userObject | false

    Penggunaan: tunggu hingga loading false, baru ambil usernya. jika user false berarti belum login atau session sudah expired.
*/
export const useAuth = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await call.get("/user/whoami");
        if (data.success) {
          setUser(data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);
  return { user, loading };
};
