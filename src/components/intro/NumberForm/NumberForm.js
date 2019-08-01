import React from 'react';
//import PropTypes from 'prop-types';

const NumberForm = props => {
    console.log('NumberForm::reder::',props.labelName);
    return (
        <div>
            <label>{props.labelName}</label> : <input type='text' value={props.value} onChange={props.onChage}/>
        </div>
    );
};

// NumberForm.propTypes = {
    
// };

export default React.memo(NumberForm);