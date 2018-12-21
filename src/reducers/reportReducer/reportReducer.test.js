import expect from 'expect';
import reportReducer from './reportReducer';
import ACTION_TYPE from '../../actions/actionTypes';

describe('Test article Reporting Reducer', () => {
  const initalState = {
    reason: '',
  };
  const action = (actionType, reason) => ({
    type: actionType,
    reason,
  });
  const expectedState = { reason: 'copied article' };
  test('test reporting succesfully', () => {
    expect(reportReducer(initalState, action(ACTION_TYPE.SAVE_REPORT_DATA,
      'copied article'))).toEqual(expectedState);
  });
});
