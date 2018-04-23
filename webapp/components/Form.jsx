import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl,
    HelpBlock } from 'react-bootstrap/lib';
import PropTypes from 'prop-types';

/**
 * Generic form input field.
 */
class Form extends Component {
    constructor() {
        super();
        this.state = { value: '' };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.onPressEnter(this.state.value);
            this.setState({ value: '' });
        }
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        const { error, placeholder, controlLabel } = this.props;
        return (
            <FormGroup validationState={error && 'error'}>
                <ControlLabel>{controlLabel}</ControlLabel>
                <FormControl
                    type='text'
                    value={this.state.value}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                />
                <HelpBlock>{error}</HelpBlock>
            </FormGroup>
        );
    }
}

Form.propTypes = {
    onPressEnter: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    controlLabel: PropTypes.string.isRequired,
    error: PropTypes.string,
};

export default Form;