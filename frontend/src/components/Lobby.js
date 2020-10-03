import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Lobby.css";

import { UserContext } from "./UserContext";

const Lobby = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();

  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !room) {
      return;
    }
    setUserInfo({ username, room });
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
