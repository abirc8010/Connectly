
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UsernameInput = ({ setUsername, connect, username }) => {
  return (
    <div>
      <h1>Join Meeting</h1>
      <TextField onChange={(e) => setUsername(e.target.value)} value={username} />
      <Button variant="contained" onClick={connect}>
        Connect
      </Button>
    </div>
  );
};

export default UsernameInput;
