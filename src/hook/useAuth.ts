import { useEffect, useState } from "react";

/*
    const { user, loading } = useAuth()

    user = userObject | false | null
    loading = true | false
    loading = true => user = null
    loading = false => user = userObject | false

    Penggunaan: tunggu hingga loading false, baru ambil usernya. jika user false berarti belum login atau session sudah expired.
*/
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:3000/user/whoami", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

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
