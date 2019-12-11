import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function CardItem({ card, deleteCard }) {
	const [ show, setShow ] = useState(false);

	if (!show) {
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
							onClick={() => setShow(true)}
							style={{ float: 'right' }}
						>
							Delete
						</button>
					</Card.Footer>
				</Card>
			</div>
		);
	} else {
		return (
			<div>
				<Card
					bg="danger"
					border="dark"
					className="card"
					style={{
						height: '15.2rem',
						width: '16rem',
						float: 'left',
						margin: '5px',
						padding: '5px 3px'
					}}
				>
					<Card.Header as="h5">
						<div align="center">Delete action</div>
					</Card.Header>
					<Card.Body className="cardBody">
						<Card.Title>Do you want to delete this card ?</Card.Title>
					</Card.Body>
					<Card.Footer>
						<button type="button" className="btn btn-danger" onClick={() => deleteCard(card.id)}>
							Delete
						</button>
						<button
							type="button"
							className="btn btn-info"
							onClick={() => setShow(false)}
							style={{ float: 'right' }}
						>
							Cancel
						</button>
					</Card.Footer>
				</Card>
			</div>
		);
	}
}

CardItem.propTypes = {
	card: PropTypes.object.isRequired
};
