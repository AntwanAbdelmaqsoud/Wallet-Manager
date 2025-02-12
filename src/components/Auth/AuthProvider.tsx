import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: googleLoginData) => void;
  logout: () => void;
  user: UserData | null;
  accessToken: string;
}

type UserData = {
  _id: string;
  email: string;
  __v: number;
  createdAt: string;
  googleId: string;
  name: string;
  picture: string;
  updatedAt: string;
};

export type googleLoginData = {
  user: UserData;
  accessToken: string;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
  accessToken: "",
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<null | UserData>(null);
  const [token, setToken] = useState<string>("");

  const login = async (data: googleLoginData) => {
    setIsAuthenticated(true);
    setUser(data.user);
    setToken(data.accessToken);
    // const accessToken: string =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjEwNTg5OTEyODAyOTY3NTUwMjE3NyIsImVtYWlsIjoiYW50d2FuYWJkZWxtYXFzb3VkOEBnbWFpbC5jb20iLCJ1c2VySWQiOiIxOTcwYTA4NC01ZjVmLTQ1YWQtYWE3NC0wMGYzNDRhMmI2ZWQiLCJpYXQiOjE3MzkzNjM4NDEsImV4cCI6MTczOTM5OTg0MX0.uQBfSeoeMLo01jafy6sV8OXpuaV8DPNmSb2MB0CO0qY";
    // setToken(accessToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, accessToken: token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
