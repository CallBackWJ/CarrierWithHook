import React from 'react';
//import PropTypes from 'prop-types';

const NumberForm = props => {
    return (
        <div>
            <label>{props.labelName}</label> : <input type='text' value={props.value} onChange={props.onChage}/>
        </div>
    );
};

// NumberForm.propTypes = {
    
// };

export default NumberForm;