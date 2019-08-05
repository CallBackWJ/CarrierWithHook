import{ createContext } from "react";

const BaggageContext = createContext({
  lineLength: 0,
  maxWeight: 0,
  baggageList: [],
  setValue:()=>{},
});
export default BaggageContext;