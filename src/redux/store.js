import {createStore} from 'redux';
const defaultState = {
  cityName: null,
  temp: null,
  isLoading: false,
  err: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_FETCH':
      return {cityName: null, temp: null, isLoading: true, err: false};
    case 'FETCH_SUCCESS':
      return {
        cityName: action.cityName,
        err: false,
        temp: action.temp,
        isLoading: false,
      };
    case 'FETCH_ERROR':
      return {
        cityName: null,
        err: true,
        temp: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
export default store;
