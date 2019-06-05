import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import TagSelector from './TagSelector'
import {loadTags, createTag} from "../../../../actions/tagActions";
class Preferences extends Component {

    componentDidMount(){
        this.props.loadTags();
    }
    renderInput({input, label, meta}) {
        return (
            <div className="form-group">
                <label>{label}</label>
                <input {...input} className="form-control"/>
            </div>
        )
    }

    onSubmit = (formValues) => {
        console.log(formValues);
    };

    onTagChange = (value, actions)=>{
        console.log(value,actions)
        if(actions.actions == 'create-option'){
            this.props.createTag(value.value)
        }
    }

    render() {
        

        return (

            <div className="home_header login_header">
                <a className="mobile-logo" href=" #"><img src="/images/board/hackachieve-symbol.svg" alt="Logo"/></a>
                <div className="login-sec">


                    <div className="form-wrapper">

                        <h3>Preferences</h3>

                        <div className="login-inner">


                <button onClick={ e=>
                    this.props.createTag('testing 5')
                }>Add Tags</button>

                    <TagSelector tags={this.props.tags} handleChange={this.onTagChange}/>




                        </div>
                    </div>

                </div>
                <div className="clear"></div>
            </div>


        );
    }
}


const validate = (formValues) => {

    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};

const formWrapped = reduxForm({
    form: 'Preferences',
    validate: validate
})(Preferences);

const mapStateToProps = (state) =>{
    
    return {
        tags: state.tags.tags,
        msg: state.msg
    }
}

export default connect(mapStateToProps, {
    loadTags,createTag
})(formWrapped)
