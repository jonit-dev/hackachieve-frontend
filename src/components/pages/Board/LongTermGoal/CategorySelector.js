import React from 'react';
import CreatableSelect from "react-select/creatable/dist/react-select.esm";


export const CategorySelector = props => {
    console.log('props', props);
    const {input, options, label} = props;
console.log(input,options,'find')
    return (
        <>
        <strong><label>{label}</label></strong>
        <CreatableSelect
            isClearable
            options={options}
            // onBlur={() => input.onBlur(input.value)}
            onChange={(value, actions) => {
                input.onChange({...value, ...actions})
            }}
            onBlur={() => input.onBlur(input.value)}
        />
        </>
    )
};
