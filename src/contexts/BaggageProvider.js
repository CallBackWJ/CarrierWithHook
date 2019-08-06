import React, { useState } from "react";
import  BaggageContext  from "./BaggageContext";

const BaggageProvider = ({ children }) => {

  const setValue = (key,value) => {
    action(prevState => {
      return {
        ...prevState,
        [key]: value
      };
    });
  };

  const initState = {
    lineLength: 0,
    maxWeight: 0,
    baggageList: [],
    setValue,
  };
  const [data, action] = useState(initState);

  return (
    <BaggageContext.Provider value={data}>{children}</BaggageContext.Provider>
  );
};

export default  BaggageProvider;