import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import IntroTemplate from "../../components/intro/IntroTemplate";
import DataForm from "../../components/intro/DataForm";
import BaggageContext from "../../contexts/BaggageContext";

const IntroContainer = props => {
  const IntroState = {
    lineLength: "",
    maxWeight: "",
    baggageList: ""
  };
  const [state, action] = useState(IntroState);
  const { lineLength, maxWeight, baggageList } = state;
  const { setValue } = useContext(BaggageContext);

  //문자열에 0~9이외에 문자가 있는지 체크
  const isNumberFormValid = text => !/[^0-9]/g.test(text);

  //문자열에 0~9의 숫자와 [ , ] 이외에 문자가 있는지 체크
  const isListFormValid = text => !/[^0-9,]/g.test(text);

  //입력폼이 모두 채워져 있는지 체크
  const isFormFilled = () =>
    lineLength !== "" && maxWeight !== "" && baggageList !== "";

  //문자열을 구분자로 나누어서 배열로 만든다.
  const makeToArray = (str, token, maxNum) =>
    str.split(token).reduce((acc, cur, index) => {
      if (cur !== "0" && cur !== "" && Number(cur) <= maxNum) {
        acc.push(Number(cur));
      } else {
        alert(
          "올바르지 않은 데이터를 삭제 후 실행합니다.[" +
            index +
            "] 데이터:[" +
            cur +
            "]"
        );
      }
      return acc;
    }, []);

  const handleLineLengthChange = e =>
    action({
      ...state,
      lineLength: isNumberFormValid(e.target.value) ? e.target.value : ""
    });

  const handleMaxWeightChange = e =>
    action({
      ...state,
      maxWeight: isNumberFormValid(e.target.value) ? e.target.value : ""
    });

  const handleListChange = e =>
    action({
      ...state,
      baggageList: isListFormValid(e.target.value) ? e.target.value : ""
    });

  const handleClick = () => {
    setValue("lineLength", Number(lineLength));
    setValue("maxWeight", Number(maxWeight));
    setValue("baggageList", makeToArray(baggageList, ",", maxWeight));
    props.history.push("/main");
  };

  return (
    <IntroTemplate>
      <DataForm
        type="number"
        labelName="라인 길이"
        onChange={handleLineLengthChange}
        value={lineLength}
        placeholder="양의 정수만 입력해주세요."
      />
      <DataForm
        type="number"
        labelName="최대 무게"
        onChange={handleMaxWeightChange}
        value={maxWeight}
        placeholder="양의 정수만 입력해주세요."
      />
      <DataForm
        type="text"
        labelName="운반 목록"
        onChange={handleListChange}
        value={baggageList}
        placeholder="쉼표(,)로 구분해주세요."
      />
      <button onClick={handleClick} disabled={!isFormFilled()}>
        START
      </button>
    </IntroTemplate>
  );
};

export default withRouter(IntroContainer);
