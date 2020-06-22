import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_PROFILE, SET_FAVORITES } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userProfile( state = [], action) {
  switch (action.type) {
    case SET_PROFILE:
      return action.value;
    default:
      return state;
  }
}

function userFavorites( state = [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userProfile,
  userFavorites
});

export default moviesApp;
