import React from "react";
import Subtract from "../assets/Subtract.png";
import { User, Menu } from "lucide-react";

const Navbar = () => {
    return (
        <div>
            <nav className="fixed top-0 left-0 w-full z-50 h-[60px] sm:h-[70px] md:h-[80px] lg:h-[100px] bg-[#fe6522] flex items-center justify-center px-4 sm:px-6">
                <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10">
                        <img 
                            src={Subtract} 
                            alt="Logo" 
                            className="h-[50px] w-[60px] sm:h-[60px] sm:w-[72px] md:h-[65px] md:w-[80px] lg:h-[72px] lg:w-[87px]" 
                        />
                        <ul className="hidden md:flex space-x-6 lg:space-x-10 text-lg md:text-xl lg:text-2xl font-poppins text-black">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex items-center space-x-6 sm:space-x-8 md:space-x-10">
                            <li className="hidden sm:block">
                                <User className="cursor-pointer h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                            </li>
                            <li>
                                <Menu className="cursor-pointer h-5 w-6 sm:h-6 sm:w-7 md:h-7 md:w-8" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
