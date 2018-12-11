import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import socialUserLogin from '../../actions/userActions';

export class SocialLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.setState({
        redirect: true,
      });
    }
  }

  login = (url, userToken) => {
    const { socialAction } = this.props;
    socialAction(url, userToken);
  }

  handleFacebookResponse = (response) => {
    const token = response.accessToken;
    this.login('auth/facebook', token);
  }

  handleGoogleResponse = (response) => {
    const token = response.accessToken;
    this.login('auth/google', token);
  }

  render() {
    const value = this.state;
    if (value.redirect) {
      const to = { pathname: '/' };
      return (<Redirect to={to} />);
    }
    const socialIcon = (onClick, iconNames) => (<FontAwesomeIcon className="icon" onClick={onClick} icon={iconNames} />);
    return (
      <div>
        <FacebookLogin
          appId="272693923595939"
          redirectUri="/"
          callback={this.handleFacebookResponse}
          render={renderProps => (socialIcon(renderProps.onClick, ['fab', 'facebook-f']))}
        />
        <GoogleLogin
          clientId="900310410364-85tesresu2mm1a5i9jugf4d4tp5qm4dj.apps.googleusercontent.com"
          redirectUri="/"
          onSuccess={this.handleGoogleResponse}
          onFailure={this.handleGoogleResponse}
          render={renderProps => (socialIcon(renderProps.onClick, ['fab', 'google']))}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.socialLoginReducer.isLoggedIn,
});
SocialLogin.propTypes = {
  isLoggedIn: PropTypes.bool,
  socialAction: PropTypes.func.isRequired,
};
SocialLogin.defaultProps = {
  isLoggedIn: false,
};

export default connect(mapStateToProps, { socialAction: socialUserLogin })(SocialLogin);
