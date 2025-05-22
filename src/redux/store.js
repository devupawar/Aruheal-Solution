import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers';

// Combine reducers into rootReducer
const rootReducer = combineReducers({
  auth: authReducer, // Ensure this key is the same used in useSelector
});

// Create store
export const store = createStore(rootReducer);
