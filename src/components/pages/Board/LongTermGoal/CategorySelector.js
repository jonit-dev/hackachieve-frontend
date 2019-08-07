import React from 'react';
import CreatableSelect from "react-select/creatable/dist/react-select.esm";


export const CategorySelector = props => {
    const {input, options, label, selectedOption} = props;
    return (
        <>
            <div className="field">

                <label>{label}</label>
                <CreatableSelect
                    value={selectedOption}
                    isClearable
                    options={options}
                    // onBlur={() => input.onBlur(input.value)}
                    onChange={(value, actions) => {
                        input.onChange({...value, ...actions})
                    }}
                    onBlur={() => input.onBlur(input.value)}
                />

            </div>
        </>
    )
};
