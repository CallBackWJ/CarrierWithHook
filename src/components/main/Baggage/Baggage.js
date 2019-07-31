import React from 'react';
import styles from "./Baggage.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Baggage = (props) => {
    return (
        <div className={cx('baggage', props.weight===0?'blank':'box')}>
            {props.weight}
        </div>
    );
};

export default Baggage;