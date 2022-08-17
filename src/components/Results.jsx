import React, { useState } from "react";
import Result from "./Result";

const Results = () => {
  const [password, setPassword] = useState("");

  if (password === process.env.REACT_APP_PASSWORD) {
    return <Result />;
  }
  return (
    <div>
      <h1>Enter Passowrd</h1>
      <input
        style={{ height: 30 }}
        autoFocus
        autoCorrect="off"
        autocomplete="off"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default Results;
