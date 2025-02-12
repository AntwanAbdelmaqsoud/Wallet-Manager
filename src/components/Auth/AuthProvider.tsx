import React, { createContext, useState, ReactNode, useEffect } from "react";

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

  // Load from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save to localStorage when accessToken or user changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = async (data: googleLoginData) => {
    setIsAuthenticated(true);
    setUser(data.user);
    setToken(data.accessToken);
    // const accessToken =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjExMjQ2Mjg0MjA4Nzk1MjQ5MTU4OSIsImVtYWlsIjoiYW50d2FuMG1la2hhZWxAZ21haWwuY29tIiwidXNlcklkIjoiZDE2YzdiMzMtYjc5ZS00OGFiLTllYTYtMjNmNDc3N2I4NDZhIiwiaWF0IjoxNzM5Mzc4ODc4LCJleHAiOjE3Mzk0MTQ4Nzh9.LAk7tL7ZDPOkKTUEgntlkCfy2AOQKPrguGMm2aJtdIg";
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
