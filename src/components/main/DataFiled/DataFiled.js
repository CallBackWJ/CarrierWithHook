import React from "react";
import PropTypes from "prop-types";
const DataFiled = props => (
  <div>
    {props.label}:{props.value}
  </div>
);

DataFiled.propTypes = {
  label: PropTypes.string.isRequired
};
export default React.memo(DataFiled);
