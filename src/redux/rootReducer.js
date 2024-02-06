import { combineReducers } from 'redux';
import { productSlice } from '../pages/product/_redux/slice';
// Add an empty line after import statement
const rootReducer = combineReducers({
  // Combine reducers here
  product: productSlice.reducer,
});

export default rootReducer;
