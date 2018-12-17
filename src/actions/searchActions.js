import axios from 'axios';
import ACTION_TYPE from './actionTypes';

const saveSearchQueryAction = payload => ({
  type: ACTION_TYPE.SAVE_SEARCH_QUERY,
  payload,
});

const saveSearchResultsAction = payload => ({
  type: ACTION_TYPE.SAVE_SEARCH_RESULTS,
  payload,
});

export const updateFilterFieldAction = payload => ({
  type: ACTION_TYPE.UPDATE_FILTER_FIELD,
  payload,
});

export const fetchSearchArticlesThunk = url => dispatch => axios.get(url)
  .then((response) => {
    dispatch(saveSearchResultsAction(response.data.results));
  })
  .catch(() => {});

export default saveSearchQueryAction;
