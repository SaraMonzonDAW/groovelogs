import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authFetch } from "../services/authFetch";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setToken(storedToken);
        setUser({ email: decoded.sub });

        loadProfile(storedToken);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const loadProfile = async (jwt) => {
    const res = await authFetch("http://localhost:8080/api/usuarios/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await res.json();

    setUser({
      email: data.email,
      displayName: data.displayName,
    });
  };

  const login = async (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);

    const decoded = jwtDecode(jwt);
    setUser({ email: decoded.sub });

    await loadProfile(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}