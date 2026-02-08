import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { authFetch } from "../services/authFetch";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const isAdmin = user?.rol === "ADMIN";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        jwtDecode(storedToken);
        setToken(storedToken);
        loadProfile();
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const loadProfile = async () => {
    const res = await authFetch(`${API_URL}/usuarios/me`);
    const data = await res.json();

    setUser({
      email: data.email,
      displayName: data.displayName,
      favoriteArtist: data.favoriteArtist,
      rol: data.rol,
    });
  };

  const login = async (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    await loadProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
  if (!token) return;

  await loadProfile(token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isAdmin,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
