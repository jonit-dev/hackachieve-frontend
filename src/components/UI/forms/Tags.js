import React from 'react';
import ReactTags from 'react-tag-autocomplete';
class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [
            ]
        }
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
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
        this.props.updateTags(tags)
    }

    render() {
        const suggestions = [];
        this.props.users.map((user) =>
            suggestions.push({
                id: user.id,
                name: `${user.first_name} ${user.last_name}`
            })
        )
        return (
            <div className="field">
                <ReactTags
                    placeholder="Email address or name"
                    minQueryLength={1}
                    tags={this.state.tags}
                    suggestions={suggestions}
                    handleInputChange={this.handleInputChange.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                    handleAddition={this.handleAddition.bind(this)} />
            </div>
        )
    }
}

export default Tags;