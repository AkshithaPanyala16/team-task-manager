import { useState } from "react";
import axios from "axios";

function Login() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await axios.post(
        "https://team-task-manager-production.up.railway.app/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Register Successful");

    } catch (error) {

      console.log(error);

      alert("Register Failed");

    }

  };

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "https://team-task-manager-production.up.railway.app/api/auth/login",
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

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
        margin: "100px auto"
      }}
    >

      <h2>Team Task Manager</h2>

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

      <button onClick={handleRegister}>
        Register
      </button>

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}

export default Login;