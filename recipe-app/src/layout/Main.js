import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./other/Navbar";
import { isAuthenticated } from "../session";

const Main = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, []);
    
    return (
        <div className="bg-pink">
            <div className="md:container md:mx-auto">
                <Navbar />
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <Outlet />
                </div>
            </div >
        </div >
    );
};

export default Main;
