import React, { useState, useContext } from "react";
import MainTemplate from "../../components/main/MainTemplate";
import Header from "../../components/main/Header";
import BaggageList from "../../components/main/BaggageList";
import Carrier from "../../components/main/Carrier";
import BaggageContext from "../../contexts/BaggageContext";

const MainContainer = props => {
  const { lineLength, maxWeight, baggageList } = useContext(BaggageContext);

  const [beforeList, setBeforeList] = useState([]);
  const [carrier, setCarrier] = useState([]);
  const [afterList, setAfterList] = useState([]);
  const [time, setTime] = useState(0);

  //Carrier 배열에 삽입가능한가.
  const isInputableToCarrier = (carrier = [], input = 0) =>
    getArraySum(carrier) + input <= maxWeight;

  //배열요소의 합계
  const getArraySum = (arr = []) => arr.reduce((acc, cur) => acc + cur, 0);

  //BeforList와 Carrier가 비어있으면 종료
  const isTerminated = (carrier = [], before = []) =>
    before.length === 0 && isInputableToCarrier(carrier, maxWeight);

  const handleCarrier = (beforeList = [],carrier = [],afterList = [],time = 0) => () => {
    //이동을 위해 배열에서 하나의 요소를 빼옴
    const beforeTemp = beforeList.shift() || 0;
    const carrierTemp = carrier.shift() || 0;

    //carrier의 요소가 빈상자(0)가 아니면 after배열에 삽입
    if (carrierTemp !== 0) {
      afterList.push(carrierTemp);
      setAfterList(afterList);
    }

    //beforeTemp를 carrier에 삽입가능하면 삽입 / 불가능하면 Carrier에 빈상자(0)을 삽입, before배열은 빼왔던 요소를 복구.
    if (isInputableToCarrier(carrier, beforeTemp)) {
      carrier.push(beforeTemp);
      setBeforeList(beforeList);
    } else {
      carrier.push(0);
      beforeList.unshift(beforeTemp);
    }

    setCarrier(carrier);
    setTime(time + 1);

    //옮길 물건이 남았으면 재실행
    if (!isTerminated(carrier, beforeList)) {
      setTimeout(handleCarrier(beforeList.slice(),carrier.slice(),afterList.slice(),time + 1),1000);
    }
  };

  const init=()=>{
    setBeforeList(baggageList.slice());
    setCarrier(Array(lineLength).fill(0));
    setAfterList([]);
    setTime(0);
  }
  const start = () => {
    init();
    setTimeout(
      handleCarrier(baggageList.slice(), Array(lineLength).fill(0)),
      1000
    );
  };

 
  
  
  return (
    <MainTemplate>
      <Header
        length={lineLength}
        weight={maxWeight}
        list={baggageList.join(",")}
        onClick={start}
        disabled={!isTerminated(carrier, beforeList)}
      />
      <BaggageList list={beforeList} />
      <Carrier list={carrier} weight={getArraySum(carrier)} time={time} />
      <BaggageList list={afterList} />
    </MainTemplate>
  );
};

export default MainContainer;
