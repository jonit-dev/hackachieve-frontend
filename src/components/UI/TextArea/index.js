import React from 'react';

const renderInputTextArea = ({input, label, meta, optional, placeholder}) => {
    return (
        <div className="field">
            <label>{label}</label>
            <textarea {...input} rows="3" placeholder={placeholder}/>
            {(optional && <>
                <div className="ui pointing label">
                    Optional Field
                </div>
            </>)}
        </div>
    )
}

export default renderInputTextArea;