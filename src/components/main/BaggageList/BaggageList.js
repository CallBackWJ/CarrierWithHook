import React from 'react';
import Baggage from '../Baggage'
import styles from "./BaggageList.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const BaggageList = (props) => {
    const {list=[]}=props;
    const Baggages=list.map((e,i)=><Baggage key={i} weight={e}/>);
    return (
        <div className={cx('baggage-list')}>
           {Baggages}
        </div>
    );
};

export default BaggageList;