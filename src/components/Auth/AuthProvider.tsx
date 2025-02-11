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
