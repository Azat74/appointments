import { combineReducers } from "redux";
import authenticate from './auth';
import api from './api';
import app from './app';


export default combineReducers({
  authenticate,
  api,
  app
});
