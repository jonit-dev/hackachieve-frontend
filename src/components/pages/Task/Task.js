import React, { Component } from "react";

import { connect } from "react-redux";

class Task extends Component {
  render() {
    return (
      <main className="board-main">
        <div className="board-columns">
          <h1>Tasks</h1>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    //actions here
  }
)(Task);
