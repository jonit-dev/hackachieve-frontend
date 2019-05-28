import React from 'react';

const renderInput = ({input, label, meta, optional, type, placeholder}) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input {...input} type={type} placeholder={placeholder}/>
            {(optional && <>
                <div className="ui pointing label">
                    Optional Field
                </div>
            </> )}
        </div>
    )
}

export default renderInput;