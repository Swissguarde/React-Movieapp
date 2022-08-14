import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTv, FaSearch, FaTable, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
const Navbar = () => {
  const [colorChange, setColorChange] = useState(false);
  const navigate = useNavigate();

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };
  const activeStyle = {
    color: "red",
  };

  window.addEventListener("scroll", changeNavbarColor);
  return (
    <div>
      <div
        className={
          colorChange
            ? "bg-black hidden fixed md:flex justify-between p-6 w-full z-[100] transition-opacity"
            : "hidden fixed bg-transparent md:flex justify-between p-6 w-full z-[100]"
        }
      >
        <Link to="/">
          <motion.div
            initial={{ opacity: 0, scale: 0.3, x: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold text-red-600">MOVIEFLIX</h1>
          </motion.div>
        </Link>
        <div>
          <Link to="/search">
            <FaSearch />
          </Link>
        </div>

        <div className="space-x-6">
          <Link to="/movies">Movies</Link>
          <Link to="/tvshows">Tv Shows</Link>
          <Link to="/login" className="">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-red-600 px-6 py-2 rounded text-white"
          >
            Sign Up
          </Link>
          <Link to="/account" className="">
            Account
          </Link>
        </div>
      </div>

      <div>
        <div className="relative">
          <Link
            to="/"
            className={
              colorChange
                ? "bg-black md:hidden text-3xl font-bold text-red-600 p-3 w-full fixed text-center z-[100]"
                : "md:hidden text-3xl font-bold text-red-600 p-3 w-full fixed text-center z-[100]"
            }
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              MOVIEFLIX
            </motion.div>
          </Link>

          <Link
            to="/search"
            className="md:hidden text-[20px] absolute top-5 right-6 z-[100]"
          >
            <FaSearch />
          </Link>
        </div>

        <div className="btm-nav bg-black md:hidden z-[60]">
          <NavLink
            id="RouterNavLink"
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <FaHome />
            <span className="btm-nav-label">Home</span>
          </NavLink>
          <NavLink
            id="RouterNavLink"
            to="/movies"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <FaTv />
            <span className="btm-nav-label">Movies</span>
          </NavLink>
          <NavLink
            id="RouterNavLink"
            to="/tvshows"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <FaTable />
            <span className="btm-nav-label">Shows</span>
          </NavLink>

          <NavLink
            id="RouterNavLink"
            to="/account"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <FaUser />
            <span className="btm-nav-label">Account</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
