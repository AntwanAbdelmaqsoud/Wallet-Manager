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
    // setToken(data.accessToken);
    const accessToken: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjExMjQ2Mjg0MjA4Nzk1MjQ5MTU4OSIsImVtYWlsIjoiYW50d2FuMG1la2hhZWxAZ21haWwuY29tIiwidXNlcklkIjoiZDE2YzdiMzMtYjc5ZS00OGFiLTllYTYtMjNmNDc3N2I4NDZhIiwiaWF0IjoxNzM5Mzc4ODc4LCJleHAiOjE3Mzk0MTQ4Nzh9.LAk7tL7ZDPOkKTUEgntlkCfy2AOQKPrguGMm2aJtdIg";
    setToken(accessToken);
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
