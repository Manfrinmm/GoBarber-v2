import React, { useState, createContext, useContext, useCallback } from "react";

import api from "../services/api";

interface AuthState {
  user: object;
  token: string;
}

interface SignCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem("@GoBarber:user");
    const token = localStorage.getItem("@GoBarber:token");

    if (user && token) {
      return { user: JSON.parse(user), token };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post("/sessions", { email, password });

      const { user, token } = response.data;

      localStorage.setItem("@GoBarber:user", JSON.stringify(user));
      localStorage.setItem("@GoBarber:token", token);

      setData({ user, token });
    } catch (error) {
      console.log(error);

      throw new Error(error.response.data.message);
    }
  }, []);

  const signOut = useCallback((): void => {
    localStorage.removeItem("@GoBarber:user");
    localStorage.removeItem("@GoBarber:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
