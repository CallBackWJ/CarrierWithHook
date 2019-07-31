import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as baggageActions from "../../store/modules/baggage";
import IntroTemplate from "../../components/intro/IntroTemplate";
import NumberForm from "../../components/intro/NumberForm";
import { Link } from "react-router-dom";

class IntroContainer extends Component {
  state = {
    lineLength: "",
    maxWeight: "",
    baggageList: ""
  };

  handleLineLengthChange = e => {
    this.setState({ lineLength: e.target.value });
  };
  handleMaxWeightChange = e => {
    this.setState({ maxWeight: e.target.value });
  };
  handleListChange = e => {
    this.setState({ baggageList: e.target.value });
  };
  handleClick = () => {
    const {BaggageActions}=this.props;
    const {lineLength,maxWeight,baggageList}=this.state;
    BaggageActions.setLineLength(Number(lineLength));
    BaggageActions.setMaxWeight(Number(maxWeight));
    BaggageActions.setBaggageList(baggageList);
  };

  render() {
    const {lineLength,maxWeight,baggageList}=this.state;
    return (
      <IntroTemplate>
        <NumberForm type='number' labelName='라인 길이' onChage={this.handleLineLengthChange} value={lineLength}/>
        <NumberForm type='number' labelName='최대 무게' onChage={this.handleMaxWeightChange} value={maxWeight}/>
        <NumberForm type='text'labelName='운반 목록' onChage={this.handleListChange} value={baggageList}/>
        <Link to="/main" onClick={this.handleClick}>START </Link>
      </IntroTemplate>
    );
  }
}

export default connect(
  state => ({
    num: state.baggage.num
  }),
  dispatch => ({
    BaggageActions: bindActionCreators(baggageActions, dispatch)
  })
)(withRouter(IntroContainer));
