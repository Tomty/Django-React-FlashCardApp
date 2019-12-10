import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './cardItem.css';

export default function CardItem({ card, deleteCard }) {
	return (
		<Card className="card" style={{ width: '15rem' }}>
			<Card.Body className="cardBody">
				<Card.Title>{card.category.name}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">{card.question}</Card.Subtitle>
				<Card.Text>{card.answer}</Card.Text>
				<Link to={`/card/${card.id}`} className="btn btn-success">
					Edit
				</Link>
				<button type="button" className="btn btn-danger" onClick={() => deleteCard(card.id)}>
					Delete
				</button>
			</Card.Body>
		</Card>
	);
}

CardItem.propTypes = {
	card: PropTypes.object.isRequired
};
