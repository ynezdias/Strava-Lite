import React from "react";

export default function UserCard({ user, onSelect, onDelete, isSelected }) {
  return (
    <div className={`card user-card ${isSelected ? "selected" : ""}`}>
      <div className="card-body">
        <div className="user-meta">
          <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-age">Age: {user.age}</div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <button className="ghost" onClick={() => onSelect(user.id)}>Select</button>
        <button className="danger" onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
}
