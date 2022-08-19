import React from "react";
import Home from "./components/Home/Home";
import Capture from "./components/Capture/Capture";
import Demo from "./components/Demo/Demo";
import Results from "./components/Results";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route
          path="/monitor/:detectionInterval"
          element={<Capture demo={false} />}
        />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
