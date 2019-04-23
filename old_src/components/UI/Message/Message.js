import React from 'react';


const Message = (props) => {


    let semanticStatus;

    switch (props.status) { //here we have to adjust the api coming status to the correct semantic ui class
        
        case 'success':
            semanticStatus = 'positive';
            break;
        case 'error' || 'danger':
            semanticStatus = 'error';
            break;
        default:
            console.log(props.status);
            semanticStatus = 'info';
            break;
    }

    return (
        <div className={`ui ${semanticStatus} message`}>
            <i className="close icon"></i>
            <div className="header">
                {props.title}
            </div>
            <p>{props.description}</p>
        </div>
    )


};

export default Message;