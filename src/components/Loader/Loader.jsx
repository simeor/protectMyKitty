import React from "react";
import CatLoader from "./catLoader.gif";

const Loader = () => {
  return (
    <div>
      <img src={CatLoader} alt="loading" width={300} />
      <h3>Loading...</h3>
    </div>
  );
};

export default Loader;
