import React from 'react';
import styles from "./Baggage.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Baggage = (props) => {
    
    return (
        <div className={cx('baggage', props.weight===0?'blank':'')}>
            {props.weight}
        </div>
    );
};
export default React.memo(Baggage);