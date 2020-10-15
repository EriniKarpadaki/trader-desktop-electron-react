import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import counterReducer from './features/counter/counterSlice';
import inquiryReducer from './features/inquiry/inquirySlice';
import offeringReducer from './features/offering/offeringSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    inquiry: inquiryReducer,
    offering: offeringReducer,
  });
}
