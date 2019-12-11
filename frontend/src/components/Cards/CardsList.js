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
					height: '15.2rem',
					margin: '5px',
					padding: '5px 3px'
				}}
			>
				<Card.Header as="h5">
					<div align="center">Add card</div>
				</Card.Header>
				<Card.Body
					className="cardBody"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Link to="/cards/new" className="btn btn-success">
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
		<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
