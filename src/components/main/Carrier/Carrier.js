import React from 'react';
import Baggage from '../Baggage'
import DataFiled from "../DataFiled";
import styles from "./Carrier.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Carrier = (props) => {
    const {list=[]}=props;
    const Baggages=list.map((e,i)=><Baggage  key={i} weight={e}/>);
    return (
        <div className={cx('carrier')}>
            <DataFiled label='Time' value={props.time}/>
            <div className={cx('item')}>
            {Baggages}
            </div>
            <DataFiled label='Weight' value={props.weight}/>
        </div>
    );
};

export default Carrier;