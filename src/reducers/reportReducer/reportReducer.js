import ACTION_TYPE from '../../actions/actionTypes';

const initalState = {
  reason: '',
};


const reportReducer = (state = initalState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SAVE_REPORT_DATA:
      return {
        ...state,
        reason: action.reason,
      };
    default:
      return state;
  }
};
export default reportReducer;
