import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backendURL =
    "https://team-task-manager-production-150a.up.railway.app";

  const handleRegister = async () => {

    try {

      await axios.post(
        `${backendURL}/api/auth/register`,
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

    } catch (error) {

      alert("Registration Failed");

    }

  };

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        `${backendURL}/api/auth/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");

    }

  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f5f9"
      }}
    >

      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "#2563eb"
          }}
        >
          Team Task Manager
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%"
          }}
        >
          Register
        </button>

        <button
          onClick={handleLogin}
          style={{
            width: "100%"
          }}
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;