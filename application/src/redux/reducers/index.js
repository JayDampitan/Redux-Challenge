import { combineReducers } from 'redux';
import TempReducer from './tempReducer';
import authReducer from './authReducer';

const allReducers =  combineReducers({
  temp: TempReducer,
  auth: authReducer,
});

export default allReducers;