"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import jwt from "jsonwebtoken";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage and auto-login
    const token = localStorage.getItem("local_token");
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded && decoded.sub) {
        setUser(decoded); // Assuming the decoded token contains user information
      } else {
        localStorage.removeItem("local_token");
      }
    }
    setLoadingAuth(false); // Done checking for token
  }, []);

  const generatePasscode = async (userId) => {
    try {
      setLoadingAuth(true); // Set loading to true while generating passcode
      const response = await axios.post("/api/generate-passcode", {
        userId,
      });
      setLoadingAuth(false); // Done generating passcode
      return response.data;
    } catch (error) {
      setLoadingAuth(false); // Error occurred, stop loading
      console.error("Failed to generate passcode: ", error);
      throw error; // Optionally rethrow to handle at the component level
    }
  };

  const verifyPasscode = async (userId, passcode) => {
    try {
      setLoadingAuth(true); // Set loading to true while verifying passcode
      const response = await axios.post("/api/verify-passcode", {
        userId,
        passcode,
      });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("local_token", token);
        const decoded = jwt.decode(token);
        setUser(decoded); // Update user state with decoded token
      }
      setLoadingAuth(false); // Done verifying passcode
      return response.data;
    } catch (error) {
      setLoadingAuth(false); // Error occurred, stop loading
      console.error("Failed to verify passcode: ", error);
      throw error; // Optionally rethrow to handle at the component level
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("local_token");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        generatePasscode,
        verifyPasscode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};