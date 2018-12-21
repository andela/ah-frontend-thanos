import React from 'react';
import './articleReporting.scss';
import * as PropTypes from 'prop-types';

const DisplayHtml = ({ handleChange, handleSubmit }) => (
  <div className="col-sm-4 offset-4 text-center reset-cont">
    <br />
    <h3 className="col-sm-8 offset-2">Report violations</h3>
    <br />
    <div>
      <form onSubmit={handleSubmit} id="reasonInput">
        <div>
          <textarea
            className="col-sm-12 form-control offset-1"
            type="text"
            id="reason"
            placeholder="Enter your comment on this article here ..."
            onChange={handleChange}
            required
          />
          {' '}
        </div>
        <br />
        <div>
          <button type="submit" className="btn col-sm-4 btn-dark">
            SUBMIT
          </button>
        </div>
      </form>
      <br />
    </div>
  </div>
);

DisplayHtml.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default DisplayHtml;
