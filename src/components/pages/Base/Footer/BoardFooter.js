import React from 'react';


const BoardFooter = (props) => {
    return (
        <React.Fragment>
            <div className="i-phone">
                <div className="board-switch">
                    <div className={this.onHandleBoardSwitchItem('all')}
                         onClick={() => this.onBoardSwitch('all')}
                    >
                        <div className="board-switch-icon"></div>
                        <div className="board-switch-text">ALL GOALS</div>
                    </div>

                    <div className="add-main">
                        <div className="plus"></div>
                    </div>
                    <div className={this.onHandleBoardSwitchItem('completed')}
                         onClick={() => this.onBoardSwitch('completed')}>
                        <div className="board-switch-icon"></div>
                        <div className="board-switch-text">COMPLETED GOALS</div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
};

export default BoardFooter;
