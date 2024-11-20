import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import loginContext from "./loginContext"; // Ensure the path is correct

const LoginContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null); // Ref for Toast notifications

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedin");
    setIsLoggedin(loggedInStatus === "true");
  }, []);

  const loginHandler = (email, password) => {
    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const user = users.find((u) => u.email === email);

    if (user) {
      if (user.password === password) {
        localStorage.setItem("isLoggedin", "true");
        setIsLoggedin(true);
        navigate("/");
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: `Welcome back, ${user.name}!`,
        });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Login Failed",
          detail: "Incorrect password. Please try again.",
        });
      }
    } else {
      toast.current.show({
        severity: "warn",
        summary: "User Not Found",
        detail: "No account found with this email.",
      });
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedin");
    setIsLoggedin(false);
    toast.current.show({
      severity: "info",
      summary: "Logged Out",
      detail: "You have successfully logged out.",
    });
    navigate('/')
  };

  const deleteAccountHandler = (id) => {
    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const updatedUsers=users.filter(user=>user.id!==id)
    localStorage.setItem('users',JSON.stringify(updatedUsers))
    
    toast.current.show({
      severity: "info",
      summary: "Feature Coming Soon",
      detail: `Delete account functionality for ID: ${id} is under development.`,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <loginContext.Provider
        value={{
          isLoggedin,
          login: loginHandler,
          logout: logoutHandler,
          deleteAccount: deleteAccountHandler,
        }}
      >
        {children}
      </loginContext.Provider>
    </>
  );
};

export default LoginContextProvider;
