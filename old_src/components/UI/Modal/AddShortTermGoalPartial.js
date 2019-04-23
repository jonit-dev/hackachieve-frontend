import React, {Component} from 'react';
import API from "../../../classes/API";
import Message from "../Message/Message";

class AddShortTermGoalPartial extends Component {

    /*
    	"title":"Long term goal here2",
	"description": "Test description",
	"duration_hrs": 0,
	"deadline": "01/31/19",
	"column_id": "1",
	"priority": 0
	*/


    state = {
        title: "",
        description: "",
        duration_hrs: 0,
        deadline: "",
        column_id: this.props.columnId,
        priority: false,
        message: {}
    };

    componentDidMount() {
        console.log(`Column id=${this.state.column_id}`);
    }

    onComponentDidUpdate() {
        console.log(this.state);
    }


    onAddNewGoal() {


        console.log("creating new goal");
        console.log(this.state);
        API.request("POST", "/goals/create/", {
            title: this.state.title,
            description: this.state.description,
            duration_hrs: this.state.duration_hrs,
            deadline: this.state.deadline,
            column_id: this.state.column_id,
            priority: this.state.priority
        }, true).then((response) => {

            if (response.data.status == 'success') {
                this.setState({
                    message: {
                        title: "Your goal was created successfully!",
                        description: 'Good job!',
                        status: 'success'
                    }
                });

                setTimeout(() => {

                    //trigger board rerendering

                    //close modal

                    window.location.reload();


                },2000)



            } else {

                console.log(response.data.type);

                this.setState({
                    message: {
                        title: "Oops!",
                        description: response.data.message,
                        status: response.data.type
                    }
                });

            }
            console.log(response.data);

        });


    }

    render() {
        return <React.Fragment>

            <form className="ui form">

                {(this.state.message.title ?
                    <Message title={this.state.message.title} description={this.state.message.description}
                             status={this.state.message.status}/> : null)}

                <div className="field">
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Goal title" onChange={(e) => {
                        this.setState({title: e.target.value})
                    }}/>
                </div>
                <div className="field">
                    <label>Description</label>
                    <textarea name="description" cols="10" rows="10" onChange={(e) => {
                        this.setState({description: e.target.value})
                    }}></textarea>
                </div>

                <div className="field">
                    <label>Deadline</label>
                    <input type="date" onChange={(e) => {
                        this.setState({deadline: e.target.value})
                    }}></input>
                </div>

                <div className="field">
                    <div className="ui slider checkbox">
                        <input type="checkbox" name="priority" onChange={(e) => {
                            this.setState({priority: (e.target.value === "on" ? true : false)})
                        }}/>
                        <label>Priority Goal</label>
                    </div>


                </div>


                <div className="ui button" onClick={(e) => {
                    e.preventDefault();
                    this.onAddNewGoal();
                }}>Add Goal
                </div>
            </form>


        </React.Fragment>
    }
}

export default AddShortTermGoalPartial;