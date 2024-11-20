import React from "react";

const loginContext= React.createContext({
    isLoggedin: false,
    login: (email,password)=>{},
    logout: ()=>{},
    deleteAccount: (id)=>{}
})

export default loginContext