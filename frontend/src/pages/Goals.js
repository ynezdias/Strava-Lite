import React, { useState } from "react";

export default function Goals() {
  const [goal, setGoal] = useState("");
  const [savedGoal, setSavedGoal] = useState("");

  const handleSave = () => {
    setSavedGoal(goal);
    setGoal("");
  };

  return (
    <div>
      <h2>Goal Setting</h2>
      <input
        type="text"
        placeholder="Enter your running goal"
        value={goal}
        onChange={e => setGoal(e.target.value)}
      />
      <button onClick={handleSave}>Save Goal</button>
      {savedGoal && <p>Current Goal: {savedGoal}</p>}
    </div>
  );
}
