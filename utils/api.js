import { AsyncStorage } from 'react-native'
import { all_data } from './_data'

const DB_STORAGE_KEY = 'MobileFlashcards:decks'

export function fetchDeckResults () {
	return AsyncStorage.getItem(DB_STORAGE_KEY)
    .then(initialData)
}

export function submitDeckTitle (title) {
	 return AsyncStorage.mergeItem(DB_STORAGE_KEY, JSON.stringify({
    [title]: { 
    	title,
    	questions: []
    }
  }))
}

export function addCardToDeck ( title, card ) {
	return AsyncStorage.getItem(DB_STORAGE_KEY).then((results) => {
		const data = JSON.parse(results)
		AsyncStorage.mergeItem(DB_STORAGE_KEY, JSON.stringify({
	    [title]: { 
	    	questions: [
	    		...data[title].questions,
	    		card
	    	]
	    }
	  }))
	})
}

function addCard(data, title, card) {

}

export function initialData (data) {
  data === null && setDummyData()

  return AsyncStorage.getItem(DB_STORAGE_KEY)
  									 .then(results => JSON.parse(results))
}

function setDummyData() {
	AsyncStorage.setItem(DB_STORAGE_KEY, JSON.stringify(all_data))

	return JSON.stringify(all_data)
}