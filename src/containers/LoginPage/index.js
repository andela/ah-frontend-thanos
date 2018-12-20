import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../../components/Login';
import { loginThunk } from '../../actions/loginActions/loginAction';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    const { loginUser } = this.props;
    event.preventDefault();
    loginUser(this.state);
  }

  render() {
    return (
      <Login
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func,
};
LoginPage.defaultProps = {
  loginUser: () => {},
};

const mapStateToProps = state => ({ data: state.loginReducer });

export const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginThunk(user)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
