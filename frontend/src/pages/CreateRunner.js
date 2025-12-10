import React, { useState } from 'react';
import { createUser, addRun } from '../api';
import './CreateRunner.css';

export default function CreateRunner() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [userId, setUserId] = useState(null);
  const [result, setResult] = useState('');
  const [runData, setRunData] = useState({ date:'', time:'', distance:'' });
  const [runResult, setRunResult] = useState('');

  // Create Runner
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age) { alert('Fill all fields'); return; }
    const res = await createUser({ name, age: Number(age) });
    if (res.status === 200) {
      const data = await res.json();
      setUserId(data.id);  // save the new user ID
      setResult(`Runner created! ID: ${data.id}`);
      setName('');
      setAge('');
    } else {
      setResult(`Error: ${res.status}`);
    }
  };

  // Add Run
  const handleAddRun = async (e) => {
    e.preventDefault();
    if (!userId || !runData.date || !runData.time || !runData.distance) {
      alert('Fill all run fields');
      return;
    }
    const res = await addRun(userId, runData);
    if (res.status === 200) {
      setRunResult('Run added successfully!');
      setRunData({ date:'', time:'', distance:'' });
    } else {
      setRunResult(`Error adding run: ${res.status}`);
    }
  };

  return (
    <div className="create-runner">
      <h2>Create Runner</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
        <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" min="1"/>
        <button type="submit">Create Runner</button>
      </form>
      {result && <div className="result">{result}</div>}

      {userId && (
        <div className="add-run">
          <h3>Add Run for Runner ID: {userId}</h3>
          <form onSubmit={handleAddRun}>
            <input 
              placeholder="Date (YYYY-MM-DD)" 
              value={runData.date} 
              onChange={e=>setRunData({...runData,date:e.target.value})} 
            />
            <input 
              placeholder="Time (HH:MM:SS)" 
              value={runData.time} 
              onChange={e=>setRunData({...runData,time:e.target.value})} 
            />
            <input 
              placeholder="Distance (km)" 
              value={runData.distance} 
              onChange={e=>setRunData({...runData,distance:e.target.value})} 
            />
            <button type="submit">Add Run</button>
          </form>
          {runResult && <div className="result">{runResult}</div>}
        </div>
      )}
    </div>
  );
}
