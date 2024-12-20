import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import LoginContext from "./loginCentext"; 

const LoginContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null); 

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
        localStorage.setItem('loggedinUser',JSON.stringify(user))
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

  const logoutHandler = (from) => {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem('loggedinUser')
    setIsLoggedin(false);
    if(from==='navbar'){
      toast.current.show({
        severity: "info",
        summary: "Logged Out",
        detail: "You have successfully logged out.",
      });
    }else if(from==='delete'){
      toast.current.show({
        severity: "info",
        summary: 'Deleted successfully',
        detail: 'User deleted successfully'
      })
    }else{
      toast.current.show({
        severity: "info",
        summary: 'Password successfully changed',
        detail: 'Password was successfully changed'
      })
    }
    navigate('/')
  };

  const deleteAccountHandler = (id) => {
    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const updatedUsers=users.filter(user=>user.id!==id)
    localStorage.setItem('users',JSON.stringify(updatedUsers))
    
    logoutHandler('delete')
  };

  const addUserHandler=(user)=>{
    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : []

    users.push(user);
    localStorage.setItem('users',JSON.stringify(users))

    toast.current.show({
      severity: "success",
      summary: "Signed up Successful",
      detail: 'User signed up successfully!',
    });
  }

  return (
    <>
      <Toast ref={toast} />
      <LoginContext.Provider
        value={{
          isLoggedin,
          login: loginHandler,
          logout: logoutHandler,
          deleteAccount: deleteAccountHandler,
          addUser: addUserHandler
        }}
      >
        {children}
      </LoginContext.Provider>
    </>
  );
};

export default LoginContextProvider;
