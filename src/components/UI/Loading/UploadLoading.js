import React from 'react';


const UploadLoading = (props) => {
    return (
        <React.Fragment>
            <div className="ui page active dimmer fileuploading">
                <div className="ui text loader">Uploading...</div>
            </div>
        </React.Fragment>
    )
};

export default UploadLoading;