import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTv, FaSearch } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
const Navbar = () => {
  const [colorChange, setColorChange] = useState(false);
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
        <Link to="/" className="text-3xl font-bold text-red-600">
          MOVIEFLIX
        </Link>
        <div>
          <Link to="/search">
            <FaSearch />
          </Link>
        </div>

        {user?.email ? (
          <div className="space-x-6">
            <Link to="/movies">Movies</Link>
            <Link to="/tvshows">Tv Shows</Link>

            <Link to="/account" className="">
              Account
            </Link>
            <button
              onClick={handleLogout}
              to="/signup"
              className="bg-red-600 px-6 py-2 rounded text-white"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="space-x-6">
            <Link to="/login" className="">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-red-600 px-6 py-2 rounded text-white"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div>
        <Link
          to="/"
          className={
            colorChange
              ? "bg-black md:hidden text-3xl font-bold text-red-600 p-3 w-full fixed text-center z-[100]"
              : "md:hidden text-3xl font-bold text-red-600 p-3 w-full fixed text-center z-[100]"
          }
        >
          MOVIEFLIX
          <Link to="/search" className="absolute right-6 top-6 text-sm">
            <FaSearch />
          </Link>
        </Link>

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
            <FaTv />
            <span className="btm-nav-label">Shows</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
