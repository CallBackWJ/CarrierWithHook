import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baggageActions from '../../store/modules/baggage';
import IntroTemplate from '../../components/intro/IntroTemplate'
import NumberForm from '../../components/intro/NumberForm'
import { Link } from 'react-router-dom';

class IntroContainer extends Component {

    state={
        length:'',
        weight:'',
        list:''
    }

    handleLineLengthChange=(e)=>{

        this.setState({length:e.target.value});
    }
    handleMaxWeightChange=(e)=>{
        this.setState({weight:e.target.value});
    }
    handleListChange=(e)=>{
        this.setState({list:e.target.value});
    }
    handleClick=()=>{

    }

    
    render() {
        const {length,weight,list}=this.state;
        const {num}=this.props;
        return (
            <IntroTemplate>
                <NumberForm labelName='라인 길이' onChage={this.handleLineLengthChange} value={length}/>
                <NumberForm labelName='최대 무게' onChage={this.handleMaxWeightChange} value={weight}/>
                <NumberForm labelName='운반 목록' onChage={this.handleListChange} value={list}/>
                <Link to="/main" onClick={this.handleClick}>{num}</Link>
            </IntroTemplate>
        );
    }
}

export default connect(
    (state) => ({
        num: state.baggage.num
    }),
    (dispatch) => ({
        BaggageActions: bindActionCreators(baggageActions, dispatch),
    })
  )(withRouter(IntroContainer));