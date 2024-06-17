import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg"
// LOGO_URL = "https://media.istockphoto.com/id/1312665318/vector/medical-logo-design-vector.jpg?s=1024x1024&w=is&k=20&c=tKY1zKILgjAlA9sbJe5QKjs2dbAfeZ-ID1g1DNH4kRg=";

const Header = () => {

    
    return(
        <div className="flex justify-between mb-10 pl-24  pr-36  shadow-lg items-center">
            <div className="h-[80px]   w-[200px]  flex item-center">
            <img  className=" mt-2 h-[60px]   w-[200px] object-cover object-scale-down"  src={logo} />

            </div>
            <div className="nav-items self-end">
                <ul className="flex " >
                    {/* <li className=" p-5 text-lg">status: {onlineStatus === true ? "online" : "offline" }</li> */}
                    <li className="p-5 text-lg "><Link to="/">Home</Link></li>
                    <li className="p-5 text-lg "><Link to="/chatbot">Chatbot</Link></li>
                    <li className="p-5 text-lg "><Link to="/login">Log in</Link></li>                    
                </ul>
            </div>
        </div>
    )
};

export default Header;