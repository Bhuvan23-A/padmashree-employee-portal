import { useState } from "react";
import axios from "axios";
import logo from "./assets/logo.jpeg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "https://padmashree-backend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (res.data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-950 to-purple-700">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[420px]">

        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="PadmaShree"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold text-center">
          Employee Login
        </h1>

        <p className="text-center text-gray-500 mt-2">
          PadmaShree Infotech Solutions
        </p>

        <p className="text-center text-sm text-gray-400 mb-6">
          Employee Management Portal
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-700"
        />

        <button
          onClick={login}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;