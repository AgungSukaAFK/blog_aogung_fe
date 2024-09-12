const apiurl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const call = {
  get: async (url: string) => {
    try {
      const res = await fetch(`${apiurl}${url}`, {
        method: "GET",
        credentials: "include",
      });

      const json = await res.json();
      console.log(json);
      return json;
    } catch (err) {
      console.log(`ERR CALL: ${err}`);
      return false;
    }
  },

  post: async (url: string, data?: object) => {
    try {
      const res = await fetch(`${apiurl}${url}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((err) => {
        throw err;
      });

      const json = await res.json();
      return json;
    } catch (err) {
      console.log(`ERR CALL: ${err}`);
      return false;
    }
  },
};

export default call;
