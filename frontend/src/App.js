import { useState } from "react";
import { registerUser, getUser, addRun, listRuns } from "./api";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [createdUser, setCreatedUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [runData, setRunData] = useState({ date: "", time: "", distance: "" });
  const [runs, setRuns] = useState([]);

  // REGISTER USER
  const handleRegister = async () => {
    const result = await registerUser(name, age);
    setCreatedUser(result);
  };

  // GET USER
  const handleGetUser = async () => {
    const result = await getUser(userId);
    setCreatedUser(result);
  };

  // ADD RUN
  const handleAddRun = async () => {
    const result = await addRun(userId, runData);
    alert("Run added successfully!");
  };

  // LIST RUNS
  const handleListRuns = async () => {
    const result = await listRuns(userId);
    setRuns(result.runs || []);
  };

  return (
    <div className="app-container">
      <h1 className="title">🏃‍♂️ Strava Lite</h1>

      {/* Register User */}
      <div className="card">
        <h2>Create User</h2>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
        <button onClick={handleRegister}>Register</button>

        {createdUser && (
          <p>
            Created: {createdUser.name} (ID: {createdUser.id})
          </p>
        )}
      </div>

      {/* Fetch User by ID */}
      <div className="card">
        <h2>Get User</h2>
        <input
          placeholder="User ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleGetUser}>Fetch User</button>
      </div>

      {/* Add Run */}
      <div className="card">
        <h2>Add Run</h2>
        <input placeholder="Date" onChange={(e) => setRunData({ ...runData, date: e.target.value })} />
        <input placeholder="Time" onChange={(e) => setRunData({ ...runData, time: e.target.value })} />
        <input placeholder="Distance" onChange={(e) => setRunData({ ...runData, distance: e.target.value })} />
        <button onClick={handleAddRun}>Add Run</button>
      </div>

      {/* List Runs */}
      <div className="card">
        <h2>User Runs</h2>
        <button onClick={handleListRuns}>Load Runs</button>

        <ul>
          {runs.map((run, idx) => (
            <li key={idx}>
              {run.date} — {run.distance} miles — {run.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
