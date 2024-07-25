import React, { useState } from "react";
import chat from "../assets/chat.png";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
              Log in
            </h2>
            <div className="mt-12">
              <form>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    onChange={(e) => {
                      e.preventDefault();
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    placeholder="mike@gmail.com"
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    onChange={(e) => {
                      e.preventDefault();
                      setPassword(e.target.value);
                    }}
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="mt-10">
                  <button
                    className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                Don't have an account ?{" "}
                <Link to="/signup">
                  <span className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                    Sign up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col items-center justify-center bg-indigo-100 flex-1 h-screen">
          <div className="text-center text-6xl font-bold text-blue-700">
            Chat It
          </div>
          <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
            <img width={400} src={chat} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
