import React, {Component} from 'react';
import {connect} from 'react-redux'
import {loadGoals} from "../../../actions/goalsActions";


class Board extends Component {

    componentDidMount() {

        //load all short term and long term goals
        this.props.loadGoals(0,'all');
    }


    render() {
        return (
            <React.Fragment>


                <main className="board-main">

                    <div className="board-columns">

                        <div>[Render goals here]</div>
                        {/*{this.renderColumns()}*/}

                        <div className="board-column-add column-add-short-term-goal">
                            <div className="column-add-short-term-goal-btn"></div>
                            <div className="column-add-short-term-goal-text">Add Main Goal</div>

                        </div>


                        {/*{(this.state.isMainGoalModalVisible ?*/}
                        {/*<Modal title="Add a Main Goal"*/}
                        {/*hasActions={false} visible={true}*/}
                        {/*onOpenMainGoalModal={() => {*/}
                        {/*this.onOpenMainGoalModal()*/}
                        {/*}}*/}
                        {/*>*/}
                        {/*<AddMainGoalPartial/>*/}
                        {/*</Modal>*/}
                        {/*: null)}*/}


                    </div>


                </main>


            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {
    //actions here
    loadGoals
})(Board);

