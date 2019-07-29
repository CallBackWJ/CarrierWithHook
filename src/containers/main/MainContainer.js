import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import * as baggageActions from "../../store/modules/baggage";
import MainTemplate from "../../components/main/MainTemplate";
class MainContainer extends Component {
    
  render() {
    const {num}=this.props;
    return (<MainTemplate>메인 페이지[{num}]</MainTemplate>);
  }
}

export default connect(
  state => ({
    num: state.baggage.num
  }),
  dispatch => ({
    BaggageActions: bindActionCreators(baggageActions, dispatch)
  })
)(withRouter(MainContainer));
