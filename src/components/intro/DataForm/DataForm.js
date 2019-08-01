import React from "react";
import PropTypes from "prop-types";

const DataForm = props => {
  console.log("NumberForm::reder::", props.labelName);
  return (
    <div>
      <label>{props.labelName}</label> :{" "}
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

DataForm.propTypes = {
  labelName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default React.memo(DataForm);
