import { ADD_NEW_CARD, ADD_NEW_DECK, RECEIVE_DECKS } from "./types";

export function addNewCard(newCard, title) {
  return {
    type: ADD_NEW_CARD,
    newCard,
    title
  };
}

export function addNewDeck(newDeck) {
  return {
    type: ADD_NEW_DECK,
    newDeck
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}
