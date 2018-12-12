import React from 'react';
import './passreset.scss';

const NewPassword = ({ handlepasswordChange, handleDataSubmit }) => {
  const Htmlbody = (
    <div className="col-sm-4 offset-4 text-center reset-cont">
      <br />
      <h3 className="col-sm-8 offset-2">Reset Password For Authors Haven</h3>
      <br />

      <div>
        <form onSubmit={handleDataSubmit}>
          <div>
            <input
              className="col-sm-10 form-control offset-1"
              type="password"
              id="newpassword"
              placeholder="Enter new password"
              onChange={handlepasswordChange}
            />

            <br />

            <input
              className="col-sm-10 form-control offset-1"
              type="password"
              id="confpassword"
              placeholder="Confirm password"
              onChange={handlepasswordChange}
            />
          </div>
          <br />

          <div>
            <button type="submit" className="btn col-sm-4 btn-dark">
              Submit
            </button>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
  return Htmlbody;
};

export default NewPassword;
