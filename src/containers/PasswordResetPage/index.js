import React, { Component } from 'react';
import PasswordReset from '../../components/PasswordReset';
import { PasswordInvokeThunk } from '../../actions/PassResetAction/passresetAction';

class PasswordResetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailHasError: true,
      emailError: '',
      email: '',
    };
  }

  validateEmail = (email) => {
    if (email.length === 0) {
      this.setState({ emailError: 'Email is required', emailHasError: true });
    } else if (!email.match(/^[A-Za-z0-9.+_-]+@[A-Za-z0-9._-]+\.[a-zA-Z]{2,}$/)) {
      this.setState({ emailError: 'Invalid email format', emailHasError: true });
    } else {
      this.setState({ emailError: '', emailHasError: false });
    }
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value });
    if (evt.target.id === 'email') {
      this.validateEmail(evt.target.value);
    }
  }

  handleSubmit = (event) => {
    const { email } = this.state;
    event.preventDefault();
    PasswordInvokeThunk(email);
  };

  render() {
    const { emailError, emailHasError } = this.state;
    return (
      <PasswordReset
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        emailError={emailError}
        emailHasError={emailHasError}
      />
    );
  }
}

export default PasswordResetPage;
