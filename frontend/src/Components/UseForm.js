import React, { useState } from "react";

export default function UserForm({ onCreate }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const submit = async (ev) => {
    ev.preventDefault();
    if (!name.trim() || !age) return alert("Please enter name and numeric age.");
    onCreate({ name: name.trim(), age: Number(age) });
    setName("");
    setAge("");
  };

  return (
    <form className="card small user-form" onSubmit={submit}>
      <div className="card-header">Add New Runner</div>
      <div className="card-body">
        <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} type="number" min="1" />
      </div>
      <div className="card-footer">
        <button type="submit" className="primary">Create User</button>
      </div>
    </form>
  );
}
