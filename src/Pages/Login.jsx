import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VisibilityIcon from "../assets/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
      toast.success("Successfully logged in");
    } catch (error) {
      toast.error("Wrong User Credentials");
    }
  };
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="relative">
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/a3655d04-3a74-4360-a857-4524ef0680d5/NG-en-20220808-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bg"
        />
        <div className=" bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>

              <form onSubmit={handleSubmit} className="w-full flex-col py-4">
                <input
                  className="p-3 w-full my-2 bg-white text-black rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                  id="email"
                />
                <div className="relative">
                  <input
                    className="p-3 w-full my-2 bg-white text-black rounded"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChange}
                    id="password"
                  />
                  <img
                    src={VisibilityIcon}
                    alt=""
                    className="absolute top-[25%] right-4"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
                <button className="bg-red-600 py-3 w-full my-6 rounded block">
                  Sign In
                </button>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <p>
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </p>
                  <Link to="/forgot-password">Forgot password?</Link>{" "}
                </div>
                <p className="py-10">
                  <span className="text-gray-400">New to Movieflix?</span>{" "}
                  <Link to="/signup">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
