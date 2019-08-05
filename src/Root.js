import React from "react";
import { BrowserRouter } from "react-router-dom";
import { BaggageProvider } from "./contexts/BaggageProvider";
import App from "./App";


const Root = () => {
  return (
    <BaggageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BaggageProvider>
  );
};

export default Root;
