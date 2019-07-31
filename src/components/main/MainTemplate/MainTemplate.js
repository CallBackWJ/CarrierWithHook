import React from "react";
import styles from "./MainTemplate.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const MainTemplate = ({ children }) => (
  <div className={cx("main-template")}>
    <div className={cx("header-template")}>{children[0]}</div>
    <div className={cx("body-template")}>
      <div className={cx("none-delivery-template")}>{children[1]}</div>
      <div className={cx("carrier-template")}>{children[2]}</div>
      <div className={cx("delivered-template")}>{children[3]}</div>
    </div>
  </div>
);

export default MainTemplate;
