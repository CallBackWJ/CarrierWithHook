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
    afterList: []
  };

  initBaggageList = str => str.split(",").map(e => Number(e));

  initCarrier = num =>
    Array.apply(null, new Array(num)).map(Number.prototype.valueOf, 0);

  isCarrierFull = num =>
    this.state.carrier.reduce((acc, cur) => acc + cur,0) + num > this.props.maxWeight;

  isListEmpty=(arr=[])=>arr.length===0;

  handleCarrier = () => {
    const { beforeList, carrier, afterList } = this.state;

    let beforeTemp = beforeList.shift() || 0;
    if (this.isCarrierFull(beforeTemp)) {
      carrier.push(0);
      beforeList.unshift(beforeTemp);
    } else {
      carrier.push(beforeTemp);
      this.setState({ beforeList: beforeList.map(e => e) });
    }
  

    let carrierTemp = carrier.shift();
    if (carrierTemp !== 0) {
      afterList.push(carrierTemp);
      this.setState({ afterList: afterList.map(e => e) });
    }
    this.setState({ carrier: carrier.map(e => e) });
    
    if (!this.isListEmpty(beforeList)||this.isCarrierFull(Number(this.props.maxWeight))) {
      setTimeout(this.handleCarrier, 1000);
    } 
  };


  componentDidMount() {
    this.setState({
      carrier: this.initCarrier(this.props.lineLength),
      beforeList: this.initBaggageList(this.props.baggageList)
    });

    setTimeout(this.handleCarrier, 1000);
  }
  render() {
    const { lineLength, maxWeight, baggageList } = this.props;
    const { beforeList, carrier, afterList } = this.state;

    return (
      <MainTemplate>
        <Header
          length={lineLength}
          weight={maxWeight}
          baggageList={baggageList}
        />
        <BaggageList list={beforeList} />
        <Carrier list={carrier} />
        <BaggageList list={afterList} />
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
