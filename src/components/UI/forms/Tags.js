import React from 'react';
import { connect } from "react-redux";
import { userInfoRefresh } from "../../../actions/authActions";
import ReactTags from 'react-tag-autocomplete';
class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: this.props.tags
        }
    }

    componentDidMount(){
        this.props.userInfoRefresh();
    }
    handleInputChange(input) {
        if (!this.props.isLoading) {
            this.props.searchUsers(input);
        }
    }

    handleDelete(i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
        this.props.updateTags(tags)
    }

    handleAddition(tag) {
        const tags = [].concat(this.state.tags, {
            id: tag.id,
            name: tag.email
        })
        this.setState({ tags })
        this.props.updateTags(tags)
    }

    render() {
        const suggestions = [];
        this.props.users.map((user) => {
            if(this.props.userInfo.email!==user.email){
                 suggestions.push({
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email
                })
            }
            return suggestions;
        }
        )
        return (
            <div className="field">
                <ReactTags
                    placeholder="Email address or name"
                    minQueryLength={1}
                    tags={this.state.tags}
                    suggestions={suggestions}
                    autofocus="false"
                    inputAttributes={{
                        autoComplete: "new-password"
                    }}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                    handleAddition={this.handleAddition.bind(this)} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      userInfo: state.auth.user,
    };
  };
  
  export default connect(
    mapStateToProps,
    {
        userInfoRefresh
      }
  )(Tags);
