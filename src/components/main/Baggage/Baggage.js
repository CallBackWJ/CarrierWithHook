import React from "react";
import PropTypes from "prop-types";
import styles from "./Baggage.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Baggage = props => (
  <div className={cx("baggage", props.weight === 0 ? "blank" : "")}>
    {props.weight}
  </div>
);

Baggage.propTypes = {
  weight: PropTypes.number.isRequired
};
export default React.memo(Baggage);
