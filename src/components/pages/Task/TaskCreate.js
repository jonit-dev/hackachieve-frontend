import React, { Component } from "react";

import { connect } from "react-redux";

class TaskCreate extends Component {
  render() {
    return <></>;
  }
}
const mapStateToProps = state => {
  return { someVar: state.reducerVar };
};

export default connect(
  mapStateToProps,
  {
    //actions here
  }
)(TaskCreate);
