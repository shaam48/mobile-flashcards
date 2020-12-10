import {
  fetchDeckResults,
  submitDeckTitle,
  addCardToDeck
 } from '../utils/api';

export const RECEIVE_ALL_DECKS = 'RECEIVE_ALL_DECKS';
export const NEW_DECK_TITLE = 'NEW_DECK_TITLE';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const NEW_CARD = 'NEW_CARD';

export function getDecks () {
  return (dispatch) => {
    fetchDeckResults()
    .then((data) => {
      dispatch(insertDecks(data))  
    })
  }
}

export function saveDeckTitle (title) {
  return (dispatch) => {
    submitDeckTitle(title)
    dispatch(newDeckTitle(title))
  }
}

export function saveNewCard (deckTitle, cardDetails) {
  return (dispatch) => {
    try {
      addCardToDeck(deckTitle, cardDetails);
      dispatch(newCard(deckTitle, cardDetails));
    } catch (error) {
      console.error('Error saving new card', error);
    }
  }
}

export function insertDecks(decks) {
  return {
    type: RECEIVE_ALL_DECKS,
    decks: decks,
  }
}

export function newDeckTitle(title) {
  return {
    type: NEW_DECK_TITLE,
    decks: title
  }
}

export function newCard(deckTitle, cardDetails) {
  return {
    type: NEW_CARD,
    decks: deckTitle,
    cardQuestion: cardDetails,
  }
}

export function receive_cards(cards){
  return {
    type: RECEIVE_CARDS,
    cards,
  }
}