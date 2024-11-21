import React from "react";

const LoginContext= React.createContext({
    isLoggedin: false,
    login: (email,password)=>{},
    logout: ()=>{},
    deleteAccount: (id)=>{},
    addUser: (user)=>{},
})

export default LoginContext