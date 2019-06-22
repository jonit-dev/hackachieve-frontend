import React from 'react';
import CreatableSelect from "react-select/creatable/dist/react-select.esm";
import ValidationMessage from '../../../UI/ValidationMessage/ValidationMessage';


export const TagSelector = props => {
    const { input, tags, label, meta} = props;
    return (
        <div>
        <b><label>{label}</label></b>
        <CreatableSelect
            options={tags}
            // onBlur={() => input.onBlur(input.value)}
            // onChange={this.props.handleChange}
            blurInputOnSelect={false}
 
            onChange={value => input.onChange(value)}
            onBlur={() => input.onBlur(input.value)}
            isMulti/>
            {(meta.touched && meta.error ? <ValidationMessage message={meta.error}/> : null)}
            <br />
        </div>    
    )
};

