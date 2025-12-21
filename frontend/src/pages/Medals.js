import React from "react";

export default function Medals() {
  const medals = ["Bronze - 5km", "Silver - 10km", "Gold - 20km"];

  return (
    <div>
      <h2>Medals & Rewards</h2>
      <ul>
        {medals.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
      <p>Keep running to earn more medals!</p>
    </div>
  );
}
