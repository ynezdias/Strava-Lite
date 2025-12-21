import React, { useState } from "react";

export default function Cycling() {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleLog = () => {
    setMessage(`Logged cycling: ${distance} km in ${time} hours.`);
    setDistance("");
    setTime("");
  };

  return (
    <div>
      <h2>Cycling Tracker</h2>
      <input
        type="number"
        placeholder="Distance (km)"
        value={distance}
        onChange={e => setDistance(e.target.value)}
      />
      <input
        type="text"
        placeholder="Time (hh:mm)"
        value={time}
        onChange={e => setTime(e.target.value)}
      />
      <button onClick={handleLog}>Log Cycling</button>
      {message && <p>{message}</p>}
    </div>
  );
}
