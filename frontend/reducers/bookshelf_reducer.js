

import { RECEIVE_BOOKSHELF,
         REMOVE_BOOKSHELF,
         RECEIVE_ERRORS,
         RECEIVE_ALL_BOOKSHELVES} from '../actions/bookshelf_actions';

import { merge } from 'lodash';


const BookshelfReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;

    console.log("In the reducer");
    switch(action.type) {
      case RECEIVE_ALL_BOOKSHELVES:
      return merge({}, action.shelves);

    default:
      return state;
    }

};

export default BookshelfReducer;
