import React, {Component} from 'react';
import Goal from "../Goal/Goal";
import Moment from 'react-moment';
import Modal from "../../../UI/Modal/Modal";
import AddShortTermGoalPartial from "../../../UI/Modal/AddShortTermGoalPartial";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import AddMainGoalPartial from "../../../UI/Modal/AddMainGoalPartial";
import API from "../../../../classes/API";


class Column extends Component {

    state = {
        id: this.props.id,
        boardName: this.props.boardName,
        title: this.props.title,
        completedGoalsProportion: this.props.completedGoalsProportion,
        deadline: this.props.deadline,
        percentageComplete: this.props.percentageComplete,
        goals: this.props.goals,
        isShortGoalModalVisible: false,
        isMainGoalModalVisible: false


    };

    onOpenShortTermGoalModal() {

        console.log("opening goal modal");

        // eslint-disable-next-line
        if (this.state.isShortGoalModalVisible == false) {
            this.setState({isShortGoalModalVisible: true});
        } else {
            this.setState({isShortGoalModalVisible: false});
        }

    }

    onOpenMainTermGoalModal() {

        console.log("opening main goal modal");

        // eslint-disable-next-line
        if (this.state.isMainGoalModalVisible == false) {
            this.setState({isMainGoalModalVisible: true});
        } else {
            this.setState({isMainGoalModalVisible: false});
        }

    }

    onDeleteColumn(columnId) {
        console.log("Deleting column ID:");

        API.request('DELETE', `/columns/delete/${columnId}`, null, true).then((response) => {


            console.log(response.data);
            this.props.triggerParentBoardRerender();


        });

    }

    onConvertBoardNameClass() {
        if (this.state.boardName.indexOf(' ') > -1) {
            return this.state.boardName.split(' ').join('-').toLowerCase();
        } else {
            return this.state.boardName.toLowerCase();
        }
    }


    renderGoals() {

        if (this.state.goals.length > 0) {
            return this.state.goals.map((goal) => {
                return <Goal key={goal.id} id={goal.id} title={goal.title} description={goal.description}
                             deadline={goal.deadline}
                             status={goal.status}
                             triggerParentBoardRerender={this.props.triggerParentBoardRerender}
                             triggerParentOpenModal={() => {
                                 this.onOpenShortTermGoalModal()
                             }}/>
            });
        }


    }

    render() {
        return (

            <React.Fragment>
                <div className={`board-column column-other column-${this.onConvertBoardNameClass()}`}>
                    <div className="column-header">
                        <div className="column-info">
                            <div className={`column-icon ${this.onConvertBoardNameClass()}-icon`}>
                            </div>
                            <div className={`column-board color-other color-${this.onConvertBoardNameClass()}`}>
                                {this.state.boardName}
                            </div>
                        </div>

                        <div className="column-title">
                            {this.state.title}
                        </div>
                        <Dropdown triggerParentDelete={() => {
                            this.onDeleteColumn(this.state.id)
                        }} triggerParentOpenModal={() => this.onOpenMainTermGoalModal()}/>
                    </div>

                    <div className="column-status">

                        <div className="column-status-completed">
                            <div className="column-status-completed-icon"></div>
                            <div className="column-status-completed-text">
                                {this.state.completedGoalsProportion} COMPLETED
                            </div>

                        </div>


                        <div className="column-status-deadline">
                            <div className="column-status-deadline-icon"></div>
                            <div className="column-status-deadline-text">
                                <Moment format="D MMMM, YY">{this.state.deadline}</Moment>
                            </div>

                        </div>

                        <div className="hackachieve-progress-bar w3-light-grey w3-round" id="goal-progress">
                            <div className="w3-container w3-round hackachieve-bar"
                                 style={{"width": (this.state.percentageComplete ? this.state.percentageComplete : 0)}}>&nbsp;</div>
                        </div>


                    </div>

                    <div className="column-body" data-simplebar data-simplebar-auto-hide="false">
                        {this.renderGoals()}
                    </div>

                    <div className="column-footer">

                        <div className="column-add-short-term-goal" onClick={() => {
                            this.onOpenShortTermGoalModal()
                        }}>
                            <div className="column-add-short-term-goal-btn"></div>
                            <div className="column-add-short-term-goal-text">Add Short Term Goal
                            </div>
                        </div>


                    </div>


                </div>


                {(this.state.isShortGoalModalVisible ?
                    <Modal title="Add a Short Term Goal"
                           hasActions={false} visible={true}
                           onOpenShortTermGoalModal={() => {
                               this.onOpenShortTermGoalModal()
                           }}> <AddShortTermGoalPartial columnId={this.state.id}/>
                    </Modal>
                    : null)}


                {(this.state.isMainGoalModalVisible ?
                    <Modal title="Add a Main Goal"
                           hasActions={false} visible={true}
                           onOpenMainGoalModal={() => {
                               this.onOpenMainTermGoalModal()
                           }}
                    >
                        <AddMainGoalPartial/>
                    </Modal>
                    : null)}

            </React.Fragment>


        );
    }
}

export default Column;