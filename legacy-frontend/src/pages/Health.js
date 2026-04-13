import React, { useState } from "react";

export default function Health() {
  const [pressure, setPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [records, setRecords] = useState([]);

  const handleSave = () => {
    setRecords([...records, { pressure, heartRate }]);
    setPressure("");
    setHeartRate("");
  };

  return (
    <div>
      <h2>Health Records</h2>
      <input
        type="text"
        placeholder="Blood pressure"
        value={pressure}
        onChange={e => setPressure(e.target.value)}
      />
      <input
        type="text"
        placeholder="Heart rate"
        value={heartRate}
        onChange={e => setHeartRate(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <ul>
        {records.map((r, i) => <li key={i}>Pressure: {r.pressure}, Heart Rate: {r.heartRate}</li>)}
      </ul>
    </div>
  );
}
