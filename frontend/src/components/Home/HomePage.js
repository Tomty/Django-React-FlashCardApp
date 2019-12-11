import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCards } from '../../actions/cardActions';
import { fetchCategories } from '../../actions/categoryActions';

import Card from 'react-bootstrap/Card';

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			started: false,
			categorySelected: 'No category Selected',
			numberOfCards: 0,
			cardsRemaining: 0,
			rand: 0,
			lastCard: false,
			reveal: false
		};

		this.onChange = this.onChange.bind(this);
		this.startSession = this.startSession.bind(this);
		this.nextCard = this.nextCard.bind(this);
		this.endSession = this.endSession.bind(this);
		this.reveal = this.reveal.bind(this);
	}

	componentWillMount() {
		if (this.props.cards.length === 0) this.props.fetchCards();
		if (this.props.categories.length === 0) this.props.fetchCategories();
	}

	onChange(e) {
		const nb = this.props.cards.filter((item) => item.category.name === e.target.value).length;
		this.setState({
			categorySelected: e.target.value,
			numberOfCards: nb
		});
	}

	startSession() {
		const cardsRem = this.props.cards.filter((item) => item.category.name === this.state.categorySelected);
		const max = cardsRem.length;
		const random = Math.floor(Math.random() * Math.floor(max));
		this.setState({ started: true, cardsRemaining: cardsRem, rand: random });
		if (cardsRem.length === 1) this.setState({ lastCard: true });
	}

	nextCard() {
		const cardsRem = this.state.cardsRemaining.filter(
			(item) => item.id !== this.state.cardsRemaining[this.state.rand].id
		);

		if (cardsRem.length > 1) {
			const max = cardsRem.length;
			const random = Math.floor(Math.random() * Math.floor(max));

			this.setState({ cardsRemaining: cardsRem, rand: random, reveal: false });
		} else {
			this.setState({ lastCard: true, cardsRemaining: cardsRem, rand: 0, reveal: false });
		}
	}

	endSession() {
		this.setState({
			lastCard: false,
			started: false,
			cardsRemaining: [],
			categorySelected: 'No category Selected',
			numberOfCards: 0,
			reveal: false
		});
	}

	reveal() {
		this.setState({ reveal: true });
	}

	render() {
		const categoryItems = this.props.categories.map((category) => (
			<option key={category.id} value={category.name}>
				{category.name}
			</option>
		));

		return (
			<div>
				<br />
				{!this.state.started ? (
					<div>
						<h1 align="center">Choose a category and start your learning session !</h1>
						<label style={{ marginRight: '10px', marginLeft: '10px' }}>Category: </label>
						<select
							align="center"
							style={{ width: 'auto' }}
							className="browser-default custom-select"
							name="category"
							onChange={this.onChange}
						>
							<option value="No Category Selected">Choose a category</option>
							{categoryItems}
						</select>
					</div>
				) : (
					<div>
						<h1 align="center">
							Cards Remaining:{this.state.cardsRemaining.length}/{this.state.numberOfCards}
						</h1>
						<br />
					</div>
				)}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Card
						border="dark"
						className="card"
						style={{
							minWidth: '16rem',
							width: 'auto',
							margin: '5px',
							padding: '5px 3px'
						}}
					>
						<Card.Header as="h5">
							<div align="center">{this.state.categorySelected}</div>
						</Card.Header>
						<Card.Body className="cardBody">
							{!this.state.started ? (
								<Card.Title align="center">Number of cards</Card.Title>
							) : (
								<Card.Title align="center">
									{this.state.cardsRemaining[this.state.rand].question}
								</Card.Title>
							)}
							<br />
							{!this.state.started ? (
								<Card.Title align="center">{this.state.numberOfCards}</Card.Title>
							) : (
								<Card.Title align="center">
									{!this.state.reveal ? (
										<div>?</div>
									) : (
										<div>{this.state.cardsRemaining[this.state.rand].answer}</div>
									)}
								</Card.Title>
							)}
							<br />
						</Card.Body>
						<Card.Footer align="center">
							{!this.state.started ? (
								<div>
									<button
										disabled={this.state.numberOfCards === 0}
										className="btn btn-success"
										onClick={this.startSession}
									>
										Start
									</button>
								</div>
							) : (
								<div>
									<button
										disabled={this.state.numberOfCards === 0}
										className="btn btn-info"
										onClick={this.reveal}
									>
										Reveal
									</button>

									{!this.state.lastCard ? (
										<button
											disabled={this.state.numberOfCards === 0}
											className="btn btn-success"
											onClick={this.nextCard}
										>
											Next
										</button>
									) : (
										<button
											disabled={this.state.numberOfCards === 0}
											className="btn btn-success"
											onClick={this.endSession}
										>
											End Session
										</button>
									)}
								</div>
							)}
						</Card.Footer>
					</Card>
				</div>
			</div>
		);
	}
}

HomePage.propTypes = {
	fetchCategories: PropTypes.func.isRequired,
	fetchCards: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	categories: state.categories.items,
	cards: state.cards.items
});

export default connect(mapStateToProps, { fetchCards, fetchCategories })(HomePage);
