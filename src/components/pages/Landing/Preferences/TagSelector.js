import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable';

const options =[
    {'value':'chocolate', 'label':'Chocolate'},
    {'value:':'vanilla','label':'Vanilla'}
]

class TagSelector extends React.Component {
    render() {
        return (
            <div>
            
                 <CreatableSelect options={this.props.tags}
                  onChange={this.props.handleChange}
                  isMulti/> 
                
            
            
            </div>
        )
    }
}

export default TagSelector