import React, {Component} from 'react';
import Moment from "react-moment";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import API from "../../../../classes/API";

class Goal extends Component {

    state = {
        id: this.props.id,
        title: this.props.title,
        description: this.props.description,
        deadline: this.props.deadline,
        status: this.props.status
    };

    onGoalDelete() {
        console.log(`Deleting goal id: ${this.state.id}`);


        API.request('DELETE', `/goals/delete/${this.state.id}`, null, true).then((response) => {

            console.log(response.data);
            this.props.triggerParentBoardRerender();
        });

    }

    onGoalSetStatus(statusId) {
        console.log("Updating goal values");


        //convert deadline before sending. it should follow a
        Promise.all([
            this.setState({status: statusId}),
        ]).then(() => {
            API.request('PUT', `/goals/update/${this.state.id}/`, this.state, true).then((response) => {
                console.log(response.data);

                //trigger board rerender to reflect new information
                this.props.triggerParentBoardRerender();
            });
        });


    }


    renderActions() {

        switch (this.state.status) {

            case 1: //pending

                return <div className="column-card-button" onClick={() => {
                    this.onGoalSetStatus(2)
                }}>
                    START
                </div>;


            case 2: //on going

                return <React.Fragment>
                    <div className="repeat-icon" onClick={() => {
                        this.onGoalSetStatus(1)
                    }}></div>

                    <div className="column-card-button column-card-active" onClick={() => {
                        this.onGoalSetStatus(3)
                    }}>
                        COMPLETE
                    </div>


                    <div className="column-card-text-button">
                        ON GOING
                    </div>
                </React.Fragment>;


            case 3: //done
                return null;

            default:
                return null;

        }


    }

    render() {

        let goalStyle, cardCategoryStyle;

        cardCategoryStyle = 'card-active-blue';//todo: Set card style according to category.

        switch (this.state.status) {


            case 2: //on going
                goalStyle = `column-card ${cardCategoryStyle}`;
                break;

            case 3://completed
                goalStyle = `column-card column-card-completed`;
                break;

            default:
                goalStyle = 'column-card';
                break;
        }

        return (
            <div className={goalStyle}>

                <Dropdown triggerParentDelete={() => {
                    this.onGoalDelete()
                }} triggerParentOpenModal={this.props.triggerParentOpenModal}/>


                <div className="column-card-body">


                    <div className="column-card-title">{this.state.title}</div>

                    <div className="column-card-description">{this.state.description}
                    </div>


                    <div className="column-card-deadline">
                        <div className="column-card-deadline-icon"></div>
                        <div className="column-card-deadline-text">
                            <Moment format="D MMMM, YY">{this.state.deadline}</Moment>
                        </div>
                    </div>

                </div>

                <div className="column-card-footer">

                    <div className="priority-icon"></div>

                    <div className="column-footer-actions-group">

                        {this.renderActions()}

                    </div>


                </div>

            </div>
        );
    }
}

export default Goal;