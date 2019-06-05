import React from 'react';
import CreatableSelect from 'react-select/creatable';

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