import { ADD_NEW_CARD, ADD_NEW_DECK, RECEIVE_DECKS } from "../actions";

function deck_updates(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };

    case ADD_NEW_CARD:
      return Object.assign({}, state, {
        [action.title]: {
          questions: [...state[action.title].questions, action.newCard],
          title: action.title
        }
      });

    case ADD_NEW_DECK:
      return Object.assign({}, state, {
        [action.newDeck.title]: action.newDeck
      });

    default:
      return state;
  }
}

export default deck_updates;
