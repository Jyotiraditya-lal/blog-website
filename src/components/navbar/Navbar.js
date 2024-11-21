import React, { useContext, useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from 'primereact/inputtext'
import LoginContext from "../store/loginCentext";
import { useNavigate } from "react-router-dom";
import blogLogo from "../../assets/BlogLogo.jpg";

const NavBar = () => {
    const ctx = useContext(LoginContext);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [searchValue,setSearchValue]=useState('')

    useEffect(() => {
        if (ctx.isLoggedin) {
            setItems([
                {
                    label: "Home",
                    icon: "pi pi-home",
                    command: () => navigate("/")
                },
                {
                    label: "Create",
                    icon: "pi pi-plus",
                    command: () => navigate("/create")
                },
                {
                    label: "Your Blogs",
                    icon: "pi pi-book",
                    command: () => navigate("/your-blogs")
                },
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    items:[
                        {
                            label:'Edit profile',
                            icon: 'pi pi-pencil',
                            command: ()=>{navigate('/profile')}
                        },
                        {
                            label: 'logout',
                            icon: 'pi pi-sign-out',
                            command: ()=>{ctx.logout()}
                        }
                    ]
                }
            ]);
        } else {
            setItems([
                {
                    label: "Home",
                    icon: "pi pi-home",
                    command: () => navigate("/")
                },
                {
                    label: "Login",
                    icon: "pi pi-sign-inS",
                    command: () => navigate("/login")
                }
            ]);
        }
    }, [ctx.isLoggedin, navigate]);

    const start = <img src={blogLogo} className="object-cover w-10 h-10" alt="Blog Logo" />;

    const searchHandler=(e)=>{
        e.preventDefault()
        setSearchValue(e.target.value)
    }

    return (
        <div className="flex justify-between items-center w-full bg-gray-100">
            <div className="ml-4">{start}</div>
            <InputText value={searchValue} type="text" placeholder="Search" onChange={searchHandler} className="p-inputtext-sm w-64 placeholder-custom" />
            <div className="mr-4">
                <Menubar model={items} className="justify-end" />
            </div>
        </div>
    );
};

export default NavBar;
