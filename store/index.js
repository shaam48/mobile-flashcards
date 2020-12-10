import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/';

// create the Redux Store
const store = createStore(
  reducer,
	applyMiddleware(thunk)
);

export default store;