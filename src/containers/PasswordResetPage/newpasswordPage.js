import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewPassword from '../../components/PasswordReset/newPassword';
import { PasswordEdit } from '../../actions/PassResetAction/passresetAction';

class NewPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newpassword: '',
      confpassword: '',
    };
  }

  handlepasswordChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleDataSubmit = (event) => {
    event.preventDefault();

    const myToken = window.location.href;
    const Token = myToken.toString().substring(myToken.lastIndexOf('?') + 1);
    const { newpassword, confpassword } = this.state;
    PasswordEdit(newpassword, confpassword, Token, this.props);
  };

  render() {
    return (
      <NewPassword
        handlepasswordChange={this.handlepasswordChange}
        handleDataSubmit={this.handleDataSubmit}
      />
    );
  }
}

export default connect()(NewPasswordPage);
