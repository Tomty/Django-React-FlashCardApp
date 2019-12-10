import { ADD_CARD, CARD_UPDATED, SET_CARDS, CARD_FETCHED, CARD_DELETED } from './types';

export function setCards(cards) {
	return {
		type: SET_CARDS,
		payload: cards
	};
}

export function addCard(card) {
	return {
		type: ADD_CARD,
		payload: card
	};
}

export function cardFetched(card) {
	return {
		type: CARD_FETCHED,
		payload: card
	};
}

export function cardUpdated(card) {
	return {
		type: CARD_UPDATED,
		payload: card
	};
}

export function cardDeleted(id) {
	console.log(id);
	return {
		type: CARD_DELETED,
		payload: id
	};
}

export function fetchCards() {
	return (dispatch) => {
		fetch('http://tomty.alwaysdata.net/api/flashcard/')
			.then((res) => res.json())
			.then((cards) => dispatch(setCards(cards)));
	};
}

export function saveCard(cardData) {
	return (dispatch) => {
		fetch('http://tomty.alwaysdata.net/api/flashcard/', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(cardData)
		})
			.then((res) => res.json())
			.then((card) => dispatch(addCard(card)));
	};
}

export function fetchCard(id) {
	return (dispatch) => {
		fetch('http://tomty.alwaysdata.net/api/flashcard/' + id + '/')
			.then((res) => res.json())
			.then((card) => dispatch(cardFetched(card)));
	};
}

export function updateCard(cardData) {
	return (dispatch) => {
		fetch('http://tomty.alwaysdata.net/api/flashcard/' + cardData.id + '/', {
			method: 'PUT',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(cardData)
		})
			.then((res) => res.json)
			.then((card) => dispatch(cardUpdated(card)));
	};
}

export function deleteCard(id) {
	return (dispatch) => {
		fetch('http://tomty.alwaysdata.net/api/flashcard/' + id + '/', {
			credentials: 'same-origin',
			method: 'DELETE',
			headers: { 'content-type': 'application/json' },
			body: ''
		})
			.then((res) => res.text())
			.then((card) => dispatch(cardDeleted(id)));
	};
}
