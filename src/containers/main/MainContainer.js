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
    before.length === 0 &&this.isInputableToCarrier(carrier, this.props.maxWeight);

  handleCarrier = ( beforeList = [],carrier = [],afterList = [],time = 0) => () => {
    //이동을 위해 배열에서 하나의 요소를 빼옴
    const beforeTemp = beforeList.shift() || 0;
    const carrierTemp = carrier.shift() || 0;

    //carrier의 요소가 빈상자(0)가 아니면 after배열에 삽입
    if (carrierTemp !== 0) {
      afterList.push(carrierTemp);
      this.setState({afterList: afterList});
    }

    //beforeTemp를 carrier에 삽입가능하면 삽입 / 불가능하면 Carrier에 빈상자(0)을 삽입, before배열은 빼왔던 요소를 복구.
    if (this.isInputableToCarrier(carrier, beforeTemp)) {
      carrier.push(beforeTemp);
      this.setState({beforeList: beforeList});
    } else {
      carrier.push(0);
      beforeList.unshift(beforeTemp);
    }

    //데이터 갱신
    //this.setState({carrier: carrier,beforeList: beforeList,afterList: afterList,time: time + 1});
    this.setState({carrier: carrier,time: time + 1});

    //옮길 물건이 남았으면 재실행
    if (!this.isTerminated(carrier, beforeList)) {
      setTimeout(this.handleCarrier(beforeList.slice(),carrier.slice(),afterList.slice(),time + 1),1000);
    }
  };

  start = () => {
    const { lineLength, baggageList } = this.props;
    this.setState({
      carrier: Array(lineLength).fill(0),
      beforeList: baggageList.slice(),
      afterList: [],
      time: 0,
    });
    setTimeout(this.handleCarrier(baggageList.slice(), Array(lineLength).fill(0)),1000);
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
        <BaggageList list={beforeList}/>
        <Carrier
          list={carrier}
          weight={this.getArraySum(carrier)}
          time={time}
        />
        <BaggageList list={afterList}/>
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
