import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });

    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      <p onClick={()=>navigate("/signup")}>Create an account</p>
    </div>
  );
}
