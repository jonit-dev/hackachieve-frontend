import React, {Component} from 'react';
import Column from "./Column/Column";
// import Modal from "../../UI/Modal/Modal";
// import AddShortTermGoalPartial from "../../UI/Modal/AddShortTermGoalPartial";
import API from "../../../classes/API";
import Modal from "../../UI/Modal/Modal";
import AddShortTermGoalPartial from "../../UI/Modal/AddShortTermGoalPartial";
import AddMainGoalPartial from "../../UI/Modal/AddMainGoalPartial";


class Board extends Component {

    state = {
        boards: [],
        isShortGoalModalVisible: false,
        isMainGoalModalVisible: false,
        board_api_endpoint: null
    };

    componentDidMount() {
        // console.log("Mouting board");
        // console.log(this.props);

        //get initial board data
        if (this.props.board_api_endpoint) {
            this.onFetchBoardData(this.props.board_api_endpoint);
            this.setState({board_api_endpoint: this.props.board_api_endpoint});
        }
    }


    componentDidUpdate() {
        // //Here we check if the current endpoint that was passed is not the same
        // //if you dont do this check, a infinite loop will be triggered and the app will crash
        if (this.props.board_api_endpoint !== this.state.board_api_endpoint) {
            this.setState({board_api_endpoint: this.props.board_api_endpoint}); //update current endpoint
            this.onFetchBoardData(this.props.board_api_endpoint) //load board data using specific endpoint
        }


    }

    onOpenMainGoalModal() {

        console.log("Opening modal");

        if (this.state.isMainGoalModalVisible) {
            this.setState({isMainGoalModalVisible: false});
        } else {
            this.setState({isMainGoalModalVisible: true});
        }
    }

    onFetchBoardData(url) {

        console.log("rendering board data");

        if (!url) { //if we didnt receive an actual url, set the current state as default
            url = this.state.board_api_endpoint;
        }


        API.request("GET", url, null, true).then((response) => {

            console.log(`${url} ==> Updating board data`);
            console.log(response.data);

            this.setState({boards: []}); //refresh board data
            this.setState({boards: response.data}); //update it again
        });


    }


    renderColumns() {

        if (this.state.boards.length > 0) {

            let columns = [];

            this.state.boards.forEach((board) => {

                //if this board has columns
                if (board.columns) {
                    board.columns.forEach((column) => {
                        columns.push(column);
                    });
                }
            });

            return columns.map((column) => {

                let completedGoalsString = `${column.total_completed_goals}/${column.total_goals}`;
                let percentageCompleteString = column.total_completed_goals / column.total_goals;

                return <Column id={column.id} key={column.id} boardName={column.board_name} title={column.name}
                               completedGoalsProportion={completedGoalsString} deadline={column.deadline}
                               goals={column.goals}
                               percentageComplete={percentageCompleteString}
                               triggerParentBoardRerender={() => {
                                   this.onFetchBoardData()
                               }}
                               onOpenAddGoalModal={() => {
                                   this.onOpenShortTermGoalModal()
                               }}/>

            })

        }


    }

    render() {


        return (
            <React.Fragment>


                <main className="board-main">

                    <div className="board-columns">

                        {this.renderColumns()}

                        <div className="board-column-add column-add-short-term-goal" onClick={() => {
                            this.onOpenMainGoalModal()
                        }}>
                            <div className="column-add-short-term-goal-btn"></div>
                            <div className="column-add-short-term-goal-text">Add Main Goal</div>

                        </div>


                        {(this.state.isMainGoalModalVisible ?
                            <Modal title="Add a Main Goal"
                                   hasActions={false} visible={true}
                                   onOpenMainGoalModal={() => {
                                       this.onOpenMainGoalModal()
                                   }}
                            >
                                <AddMainGoalPartial/>
                            </Modal>
                            : null)}


                    </div>


                </main>


            </React.Fragment>
        );
    }
}

export default Board;