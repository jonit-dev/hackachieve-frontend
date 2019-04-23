import React, {Component} from 'react';
import API from "../../../classes/API";
import Message from "../Message/Message";

class AddMainGoal extends Component {


    state = {
        title: "",
        description: "",
        board_id: "",
        deadline: "",
        boards: [],
        message: {}
    };

    componentDidMount() {

        //Load user boards dinamically
        API.request('GET', '/boards', null, true).then((response) => {
            let boards = response.data.map((board) => {

                return <option key={board.id} value={board.id}>{board.name}
                </option>
            });
            this.setState({boards});
        });
    }


    onAddMainGoal() {

        console.log('adding Main Goal');
        console.log(this.state);

        API.request('POST', '/columns/create/', {
            name: this.state.title,
            description: this.state.description,
            board_id: this.state.board_id,
            deadline: this.state.deadline
        }, true).then((response) => {
            console.log(response.data);
            if (response.data.status == 'success') {
                this.setState({
                    message: {
                        title: "You got it!",
                        description: response.data.message,
                        status: 'success'
                    }
                });

                setTimeout(() => {

                    //trigger board rerendering

                    //close modal

                    window.location.reload();


                }, 2000)


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


        return (

            <React.Fragment>

                <form className="ui form">

                    {(this.state.message.title ?
                        <Message title={this.state.message.title} description={this.state.message.description}
                                 status={this.state.message.status}/> : null)}


                    <div className="field">
                        <label>Main Goal Title</label>
                        <input type="text" value={this.state.title}
                               onChange={(e) => this.setState({title: e.target.value})} name="title"
                               placeholder="Name"/>
                    </div>
                    <div className="field">
                        <label>Description</label>
                        <input type="text" value={this.state.description}
                               onChange={(e) => this.setState({description: e.target.value})} name="description"
                               placeholder="Description"/>
                    </div>
                    <div className="field">
                        <label>Category</label>
                        <select size="3" onChange={(e) => {
                            this.setState({board_id: e.target.value});
                        }}>
                            {this.state.boards}
                        </select>
                        <div className="field">
                            <label>Due Date</label>
                            <input type="date" name="deadline"
                                   onChange={(e) => this.setState({deadline: e.target.value})}/>
                        </div>
                    </div>
                    <div className="ui button" onClick={(e) => {
                        e.preventDefault();
                        this.onAddMainGoal();
                    }}>Add Goal
                    </div>
                </form>
            </React.Fragment>


        )
    }
};

export default AddMainGoal;