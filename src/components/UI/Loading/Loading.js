import React from 'react';


const Loading = (props) => {
    return (
        <React.Fragment>
            <div className="ui active dimmer">
                <div className="ui text loader">Loading</div>
            </div>
        </React.Fragment>
    )
};

export default Loading;