import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as baggageActions from "../../store/modules/baggage";
import IntroTemplate from "../../components/intro/IntroTemplate";
import NumberForm from "../../components/intro/NumberForm";

class IntroContainer extends Component {
  state = {
    lineLength: "",
    maxWeight: "",
    baggageList: ""
  };

  //문자열에 0~9이외에 문자가 있는지 체크
  isNumberFormValid = text => !/[^0-9]/g.test(text);

  //문자열에 0~9의 숫자와 [ , ] 이외에 문자가 있는지 체크
  isListFormValid = text => !/[^0-9,]/g.test(text);

  //입력폼이 모두 채워져 있는지 체크
  isFormFilled = () =>
    this.state.lineLength !== "" &&
    this.state.maxWeight !== "" &&
    this.state.baggageList !== "";

  //문자열을 구분자로 나누어서 배열로 만든다.
  makeToArray = (str, token) =>
    str.split(token).reduce((acc, cur) => {
      if (cur!=='0'&&cur!=='') {
        acc.push(Number(cur));
      }
      return acc;
    }, []);

  handleLineLengthChange = e =>
    this.setState({
      lineLength: this.isNumberFormValid(e.target.value) ? e.target.value : ""
    });

  handleMaxWeightChange = e =>
    this.setState({
      maxWeight: this.isNumberFormValid(e.target.value) ? e.target.value : ""
    });

  handleListChange = e =>
    this.setState({
      baggageList: this.isListFormValid(e.target.value) ? e.target.value : ""
    });

  handleClick = () => {
    const { BaggageActions } = this.props;
    const { lineLength, maxWeight, baggageList } = this.state;
    BaggageActions.setLineLength(Number(lineLength));
    BaggageActions.setMaxWeight(Number(maxWeight));
    BaggageActions.setBaggageList(this.makeToArray(baggageList, ","));
    this.props.history.push("/main");
  };

  render() {
    const { lineLength, maxWeight, baggageList } = this.state;
    return (
      <IntroTemplate>
        <NumberForm
          type="number"
          labelName="라인 길이"
          onChage={this.handleLineLengthChange}
          value={lineLength}
        />
        <NumberForm
          type="number"
          labelName="최대 무게"
          onChage={this.handleMaxWeightChange}
          value={maxWeight}
        />
        <NumberForm
          type="text"
          labelName="운반 목록"
          onChage={this.handleListChange}
          value={baggageList}
        />
        <button onClick={this.handleClick} disabled={!this.isFormFilled()}>
          START
        </button>
      </IntroTemplate>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    BaggageActions: bindActionCreators(baggageActions, dispatch)
  })
)(withRouter(IntroContainer));
