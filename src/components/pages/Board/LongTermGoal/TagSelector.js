import React from 'react';
import CreatableSelect from "react-select/creatable/dist/react-select.esm";

export const TagSelector = props => {
    const { input, tags } = props;

    return (
        <CreatableSelect
            isClearable
            options={tags}
            // onBlur={() => input.onBlur(input.value)}
            onChange={value => {input.onChange(value)}}
            onBlur={() => input.onBlur(input.value)}
            />
    )
};
