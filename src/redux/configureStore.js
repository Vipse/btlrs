import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware,
)(createStore);

export default function configureStore(initialState) {
  let store = createStoreWithMiddleware(rootReducer, initialState, composeWithDevTools());

  sagaMiddleware.run(rootSaga);

  return store;
}
