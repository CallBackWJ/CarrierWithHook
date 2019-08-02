import React from "react";
import PropTypes from "prop-types";
import Baggage from "../Baggage";
import styles from "./BaggageList.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const BaggageList = props => {
    console.log('BaggageList',props.list);
  const { list = [] } = props;
  const Baggages = list.map((e, i) => <Baggage key={i} weight={e} />);
  return <div className={cx("baggage-list")}>{Baggages}</div>;
};
BaggageList.propTypes = {
  list: PropTypes.array.isRequired
};
export default React.memo(BaggageList);
