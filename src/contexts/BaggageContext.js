import{ createContext,useContext } from "react";

const BaggageContext = createContext({
  lineLength: 0,
  maxWeight: 0,
  baggageList: [],
  setValue:()=>{},
});
const useBaggageContext=()=>useContext(BaggageContext);
export {useBaggageContext};
export default BaggageContext;
