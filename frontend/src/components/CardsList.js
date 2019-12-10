import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';

export default function CardsList({ cards, deleteCard }) {
	const noCardsMessage = <p>There are no cards yet in your collection.</p>;

	const cardsList = <div>{cards.map((card) => <CardItem card={card} key={card.id} deleteCard={deleteCard} />)}</div>;

	return <div>{cards.length === 0 ? noCardsMessage : cardsList}</div>;
}

CardsList.propTypes = {
	cards: PropTypes.array.isRequired,
	deleteCard: PropTypes.func.isRequired
};
