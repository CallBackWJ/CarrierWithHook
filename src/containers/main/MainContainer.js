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

  makeInitializedArray = (length, value) =>
    Array.apply(null, new Array(length)).map(Number.prototype.valueOf, value);

  isInputableToCarrier = (carrier = [], input = 0) =>
    this.getArraySum(carrier) + input <= this.props.maxWeight;

  getArraySum = (arr = []) => arr.reduce((acc, cur) => acc + cur, 0);

  isListEmpty = (arr = []) => arr.length === 0;

  copyArray = (arr = []) => arr.map(e => e);

  isTerminated = (arr = [], emptyArr = []) =>
    this.isListEmpty(emptyArr) &&
    this.isInputableToCarrier(arr, Number(this.props.maxWeight));

  handleCarrier = () => {
    const { beforeList, carrier, afterList, time } = this.state;
    const beforeTemp = beforeList.shift() || 0;
    const carrierTemp = carrier.shift() || 0;

    if (carrierTemp !== 0) {
      afterList.push(carrierTemp);
    }

    if (this.isInputableToCarrier(carrier, beforeTemp)) {
      carrier.push(beforeTemp);
    } else {
      carrier.push(0);
      beforeList.unshift(beforeTemp);
    }

    this.setState({
      carrier: this.copyArray(carrier),
      beforeList: this.copyArray(beforeList),
      afterList: this.copyArray(afterList),
      time: time + 1
    });

    if (!this.isTerminated(carrier, beforeList)) {
      setTimeout(this.handleCarrier, 1000);
    }
  };

  start = () => {
    this.setState({
      carrier: this.makeInitializedArray(this.props.lineLength, 0),
      beforeList: this.copyArray(this.props.baggageList),
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
