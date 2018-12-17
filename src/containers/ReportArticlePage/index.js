import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import DisplayHtml from '../../components/ArticleReporting';
import reportingThunk, { saveReportData, NotificationError } from '../../actions/reportingAction/reportingAction';

export class ReportArticle extends Component {
  handleChange = (event) => {
    const { saveReport } = this.props;
    const reason = event.target.value;
    saveReport(reason);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { match, reason } = this.props;
    const { params } = match;
    if (reason !== localStorage.getItem('reason')) {
      reportingThunk(reason, params.articleId);
    } else {
      NotificationError('You already submitted this reason!');
    }
  };

  render() {
    return (
      <DisplayHtml
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

ReportArticle.propTypes = {
  match: PropTypes.shape({}).isRequired,
  saveReport: PropTypes.func.isRequired,
  reason: PropTypes.string.isRequired,
};
const mapStateToProps = ({ reportReducer }) => ({
  reason: reportReducer.reason,
  hasChanged: reportReducer.hasChanged,
});
export const mapDispatchToProps = dispatch => ({
  saveReport: reason => dispatch(saveReportData(reason)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ReportArticle);
