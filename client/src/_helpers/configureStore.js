import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../_reducers/root.reducer';

const configureStore = (
  intialState = undefined,
  testEnv = false) => {
  const middlewares = [thunkMiddleware];
  if (testEnv)
    middlewares.push(createLogger({ diff: true }));

  return createStore(
    rootReducer,
    intialState,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
