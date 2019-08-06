import React, { useState } from "react";
import  BaggageContext  from "./BaggageContext";

const BaggageProvider = ({ children }) => {

  // const setValue = (key,value) => {
  //   action(prevState => {
  //     return {
  //       ...prevState,
  //       [key]: value
  //     };
  //   });
  // };

  // const initState = {
  //   lineLength: 0,
  //   maxWeight: 0,
  //   baggageList: [],
  //   setValue,
  // };
  // const [data, setData] = useState(initState);

  const [lineLength,setLinelength] =useState(0);
  const [maxWeight,setMaxWeight] =useState(0);
  const [baggageList,setBaggageList] =useState([]);

  return (
    <BaggageContext.Provider value={{lineLength,setLinelength,maxWeight,setMaxWeight,baggageList,setBaggageList}}>{children}</BaggageContext.Provider>
  );
};

export default  BaggageProvider;