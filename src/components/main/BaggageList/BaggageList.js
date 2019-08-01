import React from 'react';
import Baggage from '../Baggage'
import styles from "./BaggageList.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const BaggageList = (props) => {
    console.log('BaggageList::reder::',props.group);
    const {list=[]}=props;
    const Baggages=list.map((e,i)=><Baggage key={i} weight={e} group={props.group}/>);
    return (
        <div className={cx('baggage-list')}>
           {Baggages}
        </div>
    );
};

export default React.memo(BaggageList);