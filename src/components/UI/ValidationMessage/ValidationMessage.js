import React from 'react';


 const ValidationMessage = (props) => {
    return (
        <React.Fragment>
            <div className="ui red message">{props.message}</div>
        </React.Fragment>
    )
};

export default ValidationMessage;