import React from 'react';
import PropTypes from 'prop-types';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function CardsList({ cards, deleteCard }) {
	const addCard = (
		<div>
			<Card
				border="dark"
				className="card"
				style={{
					width: '16rem',
					height: '14.8rem',
					margin: '5px',
					padding: '5px 3px',
					backgroundColor: '#5299d3'
				}}
			>
				<Card.Header as="h5">
					<div align="center" style={{ fontWeight: 'bold', color: 'white' }}>
						Add card
					</div>
				</Card.Header>
				<Card.Body
					className="cardBody"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Link to="/cards/new" className="btn btn-success" style={{ border: 'solid black 0.1rem' }}>
						+
					</Link>
				</Card.Body>
			</Card>
		</div>
	);

	const noCardsMessage = (
		<div>
			<p align="center">There are no cards yet in your collection.</p>
			{addCard}
		</div>
	);

	const cardsList = (
		<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
			{addCard}
			{cards.map((card) => <CardItem card={card} key={card.id} deleteCard={deleteCard} />)}
		</div>
	);

	return <div>{cards.length === 0 ? noCardsMessage : cardsList}</div>;
}

CardsList.propTypes = {
	cards: PropTypes.array.isRequired,
	deleteCard: PropTypes.func.isRequired
};
