import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class renderDatePicker extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func,
      value: PropTypes.string,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
    inputValueFormat: PropTypes.string,
  };

  static defaultProps = {
    inputValueFormat: null,
  };

  state = {
    selectedDate: null,
  };

  componentWillMount() {
    if (this.props.input.value) {
      this.setState({
        selectedDate: moment(this.props.input.value, this.props.inputValueFormat),
      });
    }
  }

  handleChange = (date) => {
    this.setState({
      selectedDate: date,
    });

    this.props.input.onChange(date);
  }

  render() {
    const {
      meta: { touched, error },
      label,
      ...rest
    } = this.props;

    return (
      <div className="field">
         <label>{label}</label>
        <DatePicker
          {...rest}
          selected={this.state.selectedDate}
          onChange={this.handleChange}
        />
        {touched &&
          error &&
          <span className="datepicker__error">
            {error}
          </span>}
      </div>
    );
  }
}