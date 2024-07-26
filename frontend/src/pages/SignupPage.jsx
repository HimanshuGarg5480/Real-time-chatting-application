import React, { useState } from "react";
import chat from "../assets/chat.png";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("error");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setAlertMessage(data.error);
        setError(true);
        return;
      }
      localStorage.setItem("accessToken", data.accessToken);
      console.log("Login successful!", data);
      navigate("/");
    } catch (error) {
      setAlertMessage(error.message);
      setError(true);
      console.log(error.message);
    }
  };

  return (
    <>
      {error && (
        <Alert status="error" message={alertMessage} setAlert={setError} />
      )}
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 text-3xl text-blue-900 font-bold flex justify-center lg:hidden">Chat It</div>
        <div className="mt-6 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-4 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-3xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
              Sign up
            </h2>
            <div className="mt-6 lg:mt-8">
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
                <div className="mt-6 lg:mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Username
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    onChange={(e) => {
                      e.preventDefault();
                      setUsername(e.target.value);
                    }}
                    value={username}
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="mt-6 lg:mt-8">
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
                    onClick={handleSignup}
                    className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className="mt-7 text-sm font-display font-semibold text-gray-700 text-center">
                have an account already?{" "}
                <Link to="/login">
                  <span className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                    Log in
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

export default SignupPage;
