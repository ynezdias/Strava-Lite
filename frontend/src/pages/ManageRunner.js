import React, { useState } from 'react';
import { getUser, deleteUser, listUsers, listRuns, addRun } from '../api';
import './ManageRunner.css';

export default function ManageRunner() {
  const [userId, setUserId] = useState('');
  const [lookupResult, setLookupResult] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [runsList, setRunsList] = useState([]);
  const [runData, setRunData] = useState({ date:'', time:'', distance:'' });

  // Handlers
  const handleGetUser = async () => {
    if (!userId) { alert('Enter User ID'); return; }
    const res = await getUser(userId);
    if (res.status === 200) {
      const data = await res.json();
      setLookupResult(JSON.stringify(data, null, 2));
    } else if (res.status === 404) setLookupResult('User not found');
    else setLookupResult(`Error: ${res.status}`);
  };

  const handleDeleteUser = async () => {
    if (!userId) return;
    if (!window.confirm('Delete user ' + userId + '?')) return;
    const res = await deleteUser(userId);
    if (res.status === 200) setLookupResult('User deleted.');
    else if (res.status === 404) setLookupResult('User not found');
    else setLookupResult(`Error: ${res.status}`);
  };

  const handleListUsers = async () => {
    const res = await listUsers();
    if (res.status === 200) {
      const data = await res.json();
      setUsersList(data.users);
    } else setUsersList([]);
  };

  const handleListRuns = async () => {
    if (!userId) return;
    const res = await listRuns(userId);
    if (res.status === 200) {
      const data = await res.json();
      setRunsList(data.runs || []);
    } else setRunsList([]);
  };

  const handleAddRun = async (e) => {
    e.preventDefault();
    if (!userId || !runData.date || !runData.time || !runData.distance) return;
    const res = await addRun(userId, runData);
    if (res.status === 200) {
      setRunData({ date:'', time:'', distance:'' });
      handleListRuns();
    } else alert('Error adding run: ' + res.status);
  };

  return (
    <div className="manage-runner">
      <h2>Manage Runner</h2>

      <div className="section">
        <h3>Lookup / Delete User</h3>
        <div className="form-row">
          <input placeholder="User ID" value={userId} onChange={e=>setUserId(e.target.value)} />
          <button onClick={handleGetUser}>Get User</button>
          <button onClick={handleDeleteUser} className="danger">Delete</button>
        </div>
        {lookupResult && <pre className="lookup-result">{lookupResult}</pre>}
      </div>

      <div className="section">
        <h3>All Users</h3>
        <button onClick={handleListUsers}>List Users</button>
        {usersList.length > 0 && (
          <ul className="users-list">
            {usersList.map(u => <li key={u.id}>{u.name} (ID: {u.id}, Age: {u.age})</li>)}
          </ul>
        )}
      </div>

      <div className="section">
        <h3>Runs</h3>
        <div className="form-row">
          <input placeholder="User ID" value={userId} onChange={e=>setUserId(e.target.value)} />
          <button onClick={handleListRuns}>Load Runs</button>
        </div>
        {runsList.length > 0 && (
          <ul className="runs-list">
            {runsList.map((r,i) => <li key={i}>{r.date} — {r.time} — {r.distance}</li>)}
          </ul>
        )}

      </div>
    </div>
  );
}
