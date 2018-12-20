import React from 'react';
import './passreset.scss';
import * as PropType from 'prop-types';

const PasswordReset = ({
  handleChange,
  handleSubmit,
  emailError,
  emailHasError,
}) => {
  const prepHtml = (
    <div className="col-sm-4 offset-4 text-center reset-cont">
      <br />
      <h3 className="col-sm-8 offset-2">Reset Password For Authors Haven</h3>
      <br />
      <p>An email with a link to reset your password will be sent to your</p>
      <br />

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="col-sm-10 form-control offset-1"
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {' '}
          </div>
          <span className="text-danger">
            {emailError != null ? emailError : null}
          </span>
          <br />
          <div>
            <button
              type="submit"
              className="btn col-sm-4 btn-dark"
              disabled={true && emailHasError}
            >
              RESET
            </button>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
  return prepHtml;
};
PasswordReset.propTypes = {
  handleChange: PropType.func.isRequired,
  handleSubmit: PropType.func.isRequired,
};
export default PasswordReset;
