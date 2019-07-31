import React from 'react';
import DataFiled from "../DataFiled";
const Header = (props) => {
    return (
        <>
            <DataFiled label='운반 라인 길이' value={props.length}/>
            <DataFiled label='최대 적재 중량' value={props.weight}/>
            <DataFiled label='전체 배송 목록' value={props.baggageList}/>
        </>
    );
};

export default Header;