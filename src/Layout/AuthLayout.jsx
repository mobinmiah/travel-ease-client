import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const AuthLayout = () => {
    return <div className="max-w-10/12 mx-auto space-y-5 md:space-y-10">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>;
};

export default AuthLayout;