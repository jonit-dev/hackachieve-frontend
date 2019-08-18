import React from 'react';


const UploadLoading = (props) => {
    return (
        <React.Fragment>
            <div className="ui active dimmer">
                <div className="ui text loader">Uploading...</div>
            </div>
        </React.Fragment>
    )
};

export default UploadLoading;