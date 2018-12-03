import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import combinedReducers from './reducers/index';

const loggerMiddleware = createLogger();
const store = createStore(
  combinedReducers,
  compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  ),
);

export default store;
