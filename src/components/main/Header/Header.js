import React from "react";
import PropTypes from "prop-types";
import DataFiled from "../DataFiled";
const Header = props => {
  return (
    <>
      <DataFiled label="운반 라인 길이" value={props.length} />
      <DataFiled label="최대 적재 중량" value={props.weight} />
      <DataFiled label="전체 배송 목록" value={props.list} />
      <button onClick={props.onClick} disabled={props.disabled}>
        START
      </button>
    </>
  );
};
Header.propTypes = {
  length: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  list: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
export default React.memo(Header);
