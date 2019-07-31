import React from 'react';
import Baggage from '../Baggage'
import styles from "./Carrier.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Carrier = (props) => {
    const {list=[]}=props;
    const Baggages=list.map((e,i)=><Baggage  key={i} weight={e}/>);
    return (
        <div className={cx('carrier')}>
            {Baggages}
        </div>
    );
};

export default Carrier;