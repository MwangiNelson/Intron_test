import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
import { AppContextType, userDetailsType } from "../types";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext<AppContextType | undefined>(undefined);

const API_URL = "http://127.0.0.1:5000";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log("Token from localStorage:", token); // Debugging log
    if (token) {
      setUserToken(token);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const loginRes = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (loginRes.ok) {
      const { token } = await loginRes.json();
      localStorage.setItem("userToken", token);
      setUserToken(token);
      setIsAuthenticated(true);
      navigate("/");
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password");
    }
  };

  const registration = async (
    username: string,
    email: string,
    password: string
  ) => {
    const registrationRes = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (registrationRes.ok) {
      toast.success("Account created successfully!");
    } else {
      toast.error("Unable to create account");
    }
  };
  const getUserDetailsFromToken = () => {
    let token = localStorage.getItem("userToken");
    let tokenData = atob(token?.split(".")[1]);
    let userDetails = JSON.parse(tokenData);
    return userDetails.user_id;
  };

  const deleteAccount = async (id: number) => {
    const deleteRes = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    if (deleteRes.ok) {
      logout();
    } else {
      toast.error("Unable to delete account.");
    }
  };

  const updateUserDetails = async (
    username: string | null,
    email: string | null,
    password: string | null
  ) => {
    let id = getUserDetailsFromToken();
    // Build the request body dynamically
    const requestBody: {
      username?: string;
      email?: string;
      password?: string;
    } = {};
    if (username !== null) requestBody.username = username;
    if (email !== null) requestBody.email = email;
    if (password !== null) requestBody.password = password;

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      toast.success("Your details have been updated successfully!");
    } else {
      toast.error("Unable to delete account.");
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken("");
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userToken,
        login,
        registration,
        setUserToken,
        logout,
        deleteAccount,
        updateUserDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
