import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function CardItem({ card, deleteCard }) {
	return (
		<div>
			<Card
				border="dark"
				className="card"
				style={{
					width: '16rem',
					float: 'left',
					margin: '5px',
					padding: '5px 3px'
				}}
			>
				<Card.Header as="h5">
					<div align="center">{card.category.name}</div>
				</Card.Header>
				<Card.Body className="cardBody">
					<Card.Title>{card.question}</Card.Title>
					<br />
					<Card.Subtitle className="mb-2 text-muted">{card.answer}</Card.Subtitle>
				</Card.Body>
				<Card.Footer>
					<Link to={`/card/${card.id}`} className="btn btn-success">
						Edit
					</Link>
					<button
						type="button"
						className="btn btn-danger"
						onClick={() => deleteCard(card.id)}
						style={{ float: 'right' }}
					>
						Delete
					</button>
				</Card.Footer>
			</Card>
		</div>
	);
}

CardItem.propTypes = {
	card: PropTypes.object.isRequired
};
