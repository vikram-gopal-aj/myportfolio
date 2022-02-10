import React, { useState, useEffect } from "react";
import DevIcons from "../components/dev-icons";

function Home() {
  const roles = ["Frontend Developer.", "Problem Solver.", "Team Player."];
  const [num, setNum] = useState(0);

  useEffect(() => {
    const roleIndex = () => setNum((i) => i + 1);
    const roleId = setInterval(roleIndex, 1500);
    return () => clearInterval(roleId);
  }, []);

  return (
    <div className="main-content">
      <div className="intro-block">
        <h2>Hi, my name is Vikram Gopal</h2>
        <h1>
          I am a <span>{roles[num % roles.length]}</span>
        </h1>
        <DevIcons />
      </div>
    </div>
  );
}

export default Home;
