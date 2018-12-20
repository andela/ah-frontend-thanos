import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTag } from '../../actions/tagsActions';
import TagList from './TagList';


export class Tags extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTag());
  }

  render() {
    const { tags } = this.props;
    return (<TagList tags={tags} key={tags.id} />);
  }
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
};
Tags.defaultProps = {
  tags: [{}],
};
export const mapStateToProps = ({ tagsReducer }) => ({ tags: tagsReducer.tags });
export default connect(mapStateToProps)(Tags);
