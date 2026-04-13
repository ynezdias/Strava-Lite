import React, { useState } from "react";

export default function Friends() {
  const [friend, setFriend] = useState("");
  const [comparison, setComparison] = useState("");

  const handleCompare = () => {
    setComparison(`Comparing your stats with ${friend}: You both ran 10 km today!`);
    setFriend("");
  };

  return (
    <div>
      <h2>Friend Comparison</h2>
      <input
        type="text"
        placeholder="Friend's name"
        value={friend}
        onChange={e => setFriend(e.target.value)}
      />
      <button onClick={handleCompare}>Compare</button>
      {comparison && <p>{comparison}</p>}
    </div>
  );
}
