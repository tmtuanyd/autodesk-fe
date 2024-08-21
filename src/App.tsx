import React from "react";
import "./App.css";
import Home from "./pages/home";
import AppProvider from "./contexts/AppProvider";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Home />
      </div>
    </AppProvider>
  );
}

export default App;
