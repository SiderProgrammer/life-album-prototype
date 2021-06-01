import { createContext, useCallback, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const checkToken = useCallback(async () => {
    const token = data.token;

    if (token) {
      try {
        await api.get("check-token", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setData({});
      }
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ user: data.user, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
