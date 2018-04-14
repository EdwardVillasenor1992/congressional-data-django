import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl,
    HelpBlock } from 'react-bootstrap/lib';

/**
 * Generic form input field.
 */
class Form extends Component {
    state = { value: '' };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.onPressEnter(this.state.value);
            this.setState({ value: '' });
        }
    }

    handleChange = (e) => this.setState({ value: e.target.value });

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

export default Form
