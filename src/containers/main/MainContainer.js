import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as baggageActions from "../../store/modules/baggage";
import MainTemplate from "../../components/main/MainTemplate";
import Header from "../../components/main/Header";
import BaggageList from "../../components/main/BaggageList";
import Carrier from "../../components/main/Carrier";

class MainContainer extends Component {
  state = {
    beforeList: [],
    carrier: [],
    afterList: [],
    time: 0
  };

  //Carrier 배열에 삽입가능한가.
  isInputableToCarrier = (carrier = [], input = 0) =>
    this.getArraySum(carrier) + input <= this.props.maxWeight;

  //배열요소의 합계
  getArraySum = (arr = []) => arr.reduce((acc, cur) => acc + cur, 0);

  //BeforList와 Carrier가 비어있으면 종료
  isTerminated = (carrier = [], before = []) =>
    (before.length === 0) &&
    this.isInputableToCarrier(carrier, Number(this.props.maxWeight));

    
  handleCarrier = () => {
    const { beforeList, carrier, afterList, time } = this.state;

    //배열 연산을 위해 복사본 생성;
    const newBeforeList = beforeList?beforeList.slice():[];
    const newCarrier = carrier?carrier.slice():[];
    const newAfterList = afterList?afterList.slice():[];

    //*********************************************/
    //이동을 위해 배열에서 하나의 요소를 빼옴
    const beforeTemp = newBeforeList.shift() || 0;
    const carrierTemp = newCarrier.shift() || 0;

    //carrier의 요소가 빈상자(0)가 아니면 after배열에 삽입
    if (carrierTemp !== 0) {
      newAfterList.push(carrierTemp);
    }
    //before 배열에서 빼온 요소를 carrier요소에 삽입가능하면 삽입
    //삽입 불가능하면 Carrier에 빈상자(0)을 삽입, before배열은 빼왔던 요소를 복구.
    if (this.isInputableToCarrier(newCarrier, beforeTemp)) {
      newCarrier.push(beforeTemp);
    } else {
      newCarrier.push(0);
      newBeforeList.unshift(beforeTemp);
    }
    //*********************************************/
    //데이터 갱신
    
    this.setState({
      carrier: newCarrier,
      beforeList: newBeforeList,
      afterList: newAfterList,
      time: time + 1
    });

    if (!this.isTerminated(newCarrier, newBeforeList)) {
      setTimeout(this.handleCarrier, 1000);
    }
  };

  start = () => {
    this.setState({
      carrier: Array(this.props.lineLength).fill(0),
      beforeList: this.props.baggageList?this.props.baggageList.slice():[],
      afterList: [],
      time: 0
    });
    setTimeout(this.handleCarrier, 1000);
  };

  render() {
    const { lineLength, maxWeight, baggageList } = this.props;
    const { beforeList, carrier, afterList, time } = this.state;

    return (
      <MainTemplate>
        <Header
          length={lineLength}
          weight={maxWeight}
          list={baggageList.join(",")}
          onClick={this.start}
          disabled={!this.isTerminated(carrier, beforeList)}
        />
        <BaggageList list={beforeList} group="before" />
        <Carrier
          list={carrier}
          weight={this.getArraySum(carrier)}
          time={time}
          group="carrier"
        />
        <BaggageList list={afterList} group="after" />
      </MainTemplate>
    );
  }
}

export default connect(
  state => ({
    lineLength: state.baggage.lineLength,
    maxWeight: state.baggage.maxWeight,
    baggageList: state.baggage.baggageList
  }),
  dispatch => ({
    BaggageActions: bindActionCreators(baggageActions, dispatch)
  })
)(withRouter(MainContainer));
