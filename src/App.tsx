import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Screens/Home";
import Tv from "./Screens/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={Home}></Route>
        <Route path="/tv" element={Tv}></Route>
        <Route path="/search" element={Tv}></Route>
      </Routes>
    </Router>
  );
}

export default App;
