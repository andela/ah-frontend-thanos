import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './signup.scss';
import generateRedirectLinks from '../../commons/redirectLinks';
import SocialLogin from '../Login/socialLogin';


library.add(fab);

const formElements = [
  {
    inputType: 'text',
    elementId: 'username',
    placeholder: 'Username',
    pattern: '[A-Za-z]{3,}$',
    title: 'Must contain at least three characters or more characters without spaces',
  },
  {
    inputType: 'email',
    elementId: 'email',
    placeholder: 'Email',
    pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
    title: 'Please provide a valid email address',
  },
  {
    inputType: 'password',
    elementId: 'password',
    placeholder: '**********',
    pattern: '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z0-9$@$!%*#?&]{8,}$',
    title: 'Must contain at least one number and one letter, one special character, and at least 8 or more characters',
  },
];

const SignUp = ({ onSubmit, onChange }) => {
  const createFormElement = (inputType, elementId, placeholder, pattern, title) => (
    <div className="form-group" key={elementId}>
      <input
        type={inputType}
        placeholder={placeholder}
        className="form-control"
        pattern={`${pattern}`}
        title={title}
        id={elementId}
        name={elementId}
        onChange={onChange}
        required
      />
    </div>
  );

  return (
    <div className="container signup-box">
      <div className="col-left">
        <img src="https://iviidev.info/downloads/images/reading.jpg" alt="Sign up poster" />
      </div>
      <div className="col-right">
        <form onSubmit={onSubmit}>
          <h3 className="text-center">Sign Up</h3>
          {formElements.map(el => createFormElement(
            el.inputType, el.elementId, el.placeholder, el.pattern, el.title,
          ))}
          <div className="signup-buttons">
            <button type="submit" className="btn btn-primary" id="signUpBt" name="signUpBt">Sign Up</button>
            <div className="social-login-icons">
              <small className="text-muted p-1">Or Sign Up with Social Media: </small>
              <SocialLogin />
            </div>
          </div>
          {generateRedirectLinks('Already a member? ', 'login', 'Login')}
        </form>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SignUp;
