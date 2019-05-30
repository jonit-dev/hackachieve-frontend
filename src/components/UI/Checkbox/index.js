import React from 'react';

const renderInputCheckbox = ({input, meta, optional, label}) => {
    return (
        <div className="field">
            <div className="ui toggle checkbox">
                <input {...input} type="checkbox"/>
                <label>{label}</label>
            </div>
        </div>
    )
}

export default renderInputCheckbox;