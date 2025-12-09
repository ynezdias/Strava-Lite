import React, { useState } from "react";

export default function RunList({ runs = [], onAddRun }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!date || !time || !distance) return alert("Please fill all run fields.");
    onAddRun({ date, time, distance });
    setDate("");
    setTime("");
    setDistance("");
  };

  return (
    <div className="card runs-card">
      <div className="card-header">Runs</div>
      <div className="card-body">
        {runs.length === 0 ? (
          <div className="muted">No runs yet — add one below.</div>
        ) : (
          <ul className="runs-list">
            {runs.map((r, i) => (
              <li key={i}>
                <div className="run-date">{r.date}</div>
                <div className="run-meta">{r.time} • {r.distance}</div>
              </li>
            ))}
          </ul>
        )}

        <form className="run-form" onSubmit={handleAdd}>
          <input className="input" placeholder="Date (e.g. 2025-12-01)" value={date} onChange={(e) => setDate(e.target.value)} />
          <input className="input" placeholder="Time (e.g. 00:35:12)" value={time} onChange={(e) => setTime(e.target.value)} />
          <input className="input" placeholder="Distance (e.g. 5.2 km)" value={distance} onChange={(e) => setDistance(e.target.value)} />
          <button className="primary" type="submit">Add Run</button>
        </form>
      </div>
    </div>
  );
}
