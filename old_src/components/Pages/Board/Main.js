import React, {Component} from 'react';
import AddMainGoal from '../../UI/Modal/AddMainGoal';

class Main extends Component{
    constructor() {
        super();

        this.state = {
            show_form: false,
            category: ""
        };
    }

    change() {

        this.setState({
            show_form: !this.state.show_form,
        });
    }


    render(){
    return (
        <div className="ui equal width center aligned padded grid">
        <div className="row">
            <button id="health" className="two wide ui button column" onClick={this.change.bind(this)}>Health</button>
            <button id="career" className="two wide ui button column" onClick={this.change.bind(this)}>Career</button>
        </div>
        <div className="row">
            <button id="finance" className="two wide ui button column" onClick={this.change.bind(this)}>Finance</button>
            <button id="personal" className="two wide ui button column" onClick={this.change.bind(this)}>Personal Development</button>
        </div><div className="row">
            <button id="spiritual" className="two wide ui button column" onClick={this.change.bind(this)}>Spiritual</button>
            <button id="fun" className="two wide ui button column" onClick={this.change.bind(this)}>Fun and Recreational</button>
        </div>    
        {this.state.show_form ? <AddMainGoal category={this.state.category}/> : null}    
            
        </div>
    )
}
};

export default Main;