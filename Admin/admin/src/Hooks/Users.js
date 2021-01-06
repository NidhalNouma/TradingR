import axios from "axios";
import { useState, useEffect } from "react";

export const GetAllUsers = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await axios.post("/api/user/all");
      //   console.log(r);

      if (r.data.results) setUsers(r.data.results);
    })();
  }, []);

  return { users };
};
