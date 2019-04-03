import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const initialState = { api: { url: 'localhost:3000' } };

export default function configureStore() {
 return createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
 );
}
