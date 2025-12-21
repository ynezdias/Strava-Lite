// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calories from "./pages/Calories";
import Goals from "./pages/Goals";
import Medals from "./pages/Medals";
import Cycling from "./pages/Cycling";
import Friends from "./pages/Friends";
import Health from "./pages/Health";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calories" element={<Calories />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/medals" element={<Medals />} />
          <Route path="/cycling" element={<Cycling />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/health" element={<Health />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
