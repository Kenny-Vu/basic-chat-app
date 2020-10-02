import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Lobby.css";

const Lobby = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !room) {
      return;
    }
    history.push("./chat");
  };

  const handleInput = (e, callback) => {
    callback(e.target.value);
  };
  return (
    <form className="form">
      <input
        placeholder="username"
        value={username}
        onChange={(e) => handleInput(e, setUsername)}
      ></input>
      <input
        placeholder="room"
        value={room}
        onChange={(e) => handleInput(e, setRoom)}
      ></input>
      <button onClick={(e) => handleLogin(e)}>submit</button>
    </form>
  );
};

export default Lobby;
