import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function CardItem({ card, deleteCard }) {
	const [ show, setShow ] = useState(false);

	/* #57568c */

	if (!show) {
		return (
			<div>
				<Card
					border="dark"
					className="card"
					style={{
						minWidth: '16rem',
						maxWidth: '20rem',
						margin: '5px',
						padding: '5px 3px',
						backgroundColor: '#5299d3'
					}}
				>
					<Card.Header as="h5">
						<div align="center" style={{ fontWeight: 'bold', color: 'white' }}>
							{card.category.name}
						</div>
					</Card.Header>
					<Card.Body className="cardBody">
						<Card.Title style={{ color: 'white' }}>{card.question}</Card.Title>
						<br />
						<Card.Subtitle style={{ color: 'white', fontStyle: 'oblique' }}>{card.answer}</Card.Subtitle>
					</Card.Body>
					<Card.Footer>
						<Link
							to={`/card/${card.id}`}
							className="btn btn-success"
							style={{ border: 'solid black 0.1rem' }}
						>
							Edit
						</Link>
						<button
							type="button"
							className="btn btn-danger"
							onClick={() => setShow(true)}
							style={{ float: 'right', border: 'solid black 0.1rem' }}
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
						<div align="center" style={{ fontWeight: 'bold' }}>
							Delete action
						</div>
					</Card.Header>
					<Card.Body className="cardBody">
						<Card.Title style={{ fontWeight: 'bold' }}>Do you want to delete this card ?</Card.Title>
					</Card.Body>
					<Card.Footer>
						<button
							style={{ border: 'thick double', fontWeight: 'bold', color: 'black' }}
							type="button"
							className="btn btn-danger"
							onClick={() => deleteCard(card.id)}
						>
							Delete
						</button>
						<button
							type="button"
							className="btn btn-info"
							onClick={() => setShow(false)}
							style={{ float: 'right', border: 'thick double', fontWeight: 'bold', color: 'black' }}
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
