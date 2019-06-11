import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {loadTags, createTags} from "../../../../actions/tagActions";
import {TagSelector} from "./TagSelector";
import history from '../../../../history';
import cogoToast from 'cogo-toast';

class Preferences extends Component {

    componentWillReceiveProps(newProps){
        // const { meta } = newProps;
       // console.log(newProps)
    }


    componentDidMount() {
        this.props.loadTags();
    }

    onSubmit = (formValues) => {

        if(!formValues.knowledgeSelector) {
            cogoToast.error("Please, select some skills first!");
            return false;
        }

        console.log(formValues);
        if(Object.keys(formValues).length > 0) {
            this.props.createTags(formValues).then((response) => {
                if (response.data.success !== undefined) {
                    history.push('/board');
                }
            });
        } else {
            cogoToast.error("Please select your skills");
        }


    };

    // onTagChange = (value, actions) => {
    //
    //     console.log('VALUES');
    //     console.log(value);
    //     console.log('ACTIONS');
    //     console.log(actions);
    //
    //     if (actions.actions === 'create-option') {
    //         this.props.createTag(value.value)
    //     }
    // };

    render() {


        return (

            <div className="home_header internal_header">
                <a className="mobile-logo" href="# "><img src="images/board/hackachieve-symbol.svg" alt="Logo"/></a>
                <div className="internal-sec">
                    <h3>Your Skills</h3>
                    <div className="internal-inner">

                        <div className="internal-inner">

                            <p>
                                Please, select your personal skills here, before proceeding
                            </p>

                            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">


                                <Field name="knowledgeSelector"
                                       component={TagSelector}
                                       tags={this.props.tags}
                                />

                                <button type="submit" className="ui button positive">Save</button>

                            </form>


                            <div className="clear"></div>
                        </div>

                        <hr/>

                        {/*<h5 className="padding">You don’t need to decorate new passwords if you don’t want to,</h5>*/}

                    </div>
                </div>
                <div className="clear"></div>
            </div>


        );
    }
}


// const validate = (formValues) => {
//     const errors = {};
// console.log(formValues, 'ss')
//     if(formValues.knowledgeSelector==null){
//         errors.knowledgeSelector="Please select your skills";
//         console.log("working ========")
//     }


//     if (!formValues.title) {
//         errors.title = 'You must enter a title'
//     }


//     return errors;
// };

const formWrapped = reduxForm({
    form: 'Preferences',
   // validate: validate
})(Preferences);

const mapStateToProps = (state) => {

    return {
        tags: state.tags.tags,
        msg: state.msg
    }
};

export default connect(mapStateToProps, {
    loadTags,
    createTags
})(formWrapped)

