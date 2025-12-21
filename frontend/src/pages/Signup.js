import React, { useState } from "react";
import { signup } from "../api";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res.status === 200) {
      navigate("/");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})} />
        <input placeholder="Age" onChange={e=>setForm({...form,age:e.target.value})} />
        <input placeholder="Weight (kg)" onChange={e=>setForm({...form,weight:e.target.value})} />
        <button>Sign Up</button>
      </form>
    </div>
  );
}
