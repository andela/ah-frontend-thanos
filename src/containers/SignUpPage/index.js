import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserInput, userSignup } from '../../actions/userActions';
import SignUp from '../../components/signup';

class SignUpPage extends Component {
  handleUpdateFields = (event) => {
    const { name, value } = event.target;
    const { freshUser, getUserInputs } = this.props;
    getUserInputs({ ...freshUser, [name]: value });
  };

  handleSignUp = (event) => {
    event.preventDefault();
    const { freshUser, signUpuser } = this.props;
    signUpuser({ user: freshUser });
  };

  render() {
    return (
      <SignUp
        onChange={this.handleUpdateFields}
        onSubmit={this.handleSignUp}
      />
    );
  }
}

SignUpPage.propTypes = {
  signUpuser: PropTypes.func.isRequired,
  getUserInputs: PropTypes.func.isRequired,
  freshUser: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ user }) => (
  { freshUser: user.freshUser }
);
export const mapDispatchToProps = dispatch => (
  {
    signUpuser: user => dispatch(userSignup(user)),
    getUserInputs: obj => dispatch(getUserInput(obj)),
  }
);

export { SignUpPage };
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
