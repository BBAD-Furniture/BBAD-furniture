const GET_FILTER = 'GET_FILTER';

export const getFilter = filter => ({ type: GET_FILTER, filter });

export default function(state = {}, action) {
  switch (action.type) {
    case GET_FILTER:
      return action.filter;
    default:
      return state;
  }
}
