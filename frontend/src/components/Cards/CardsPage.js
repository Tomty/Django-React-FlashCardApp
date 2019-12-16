import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCards, deleteCard } from '../../actions/cardActions';
import { fetchCategories } from '../../actions/categoryActions';
import CardsList from './CardsList';

class CardsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardsDisplayed: [],
			searchCat: '',
			searchQuestion: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
	}

	componentWillReceiveProps(nextprops) {
		this.setState({ cardsDisplayed: nextprops.cards });
	}

	componentWillMount() {
		if (this.props.cards.length === 0) this.props.fetchCards();
		if (this.props.categories.length === 0) this.props.fetchCategories();
		this.setState({ cardsDisplayed: this.props.cards });
	}

	onChange(e) {
		let newDisplay = this.props.cards.filter((card) => card.category.name.includes(e.target.value));
		this.setState({
			cardsDisplayed: newDisplay,
			searchCat: e.target.value
		});
	}

	onChangeText(e) {
		let newDisplay = this.props.cards.filter((card) => card.category.name.includes(this.state.searchCat));
		newDisplay = newDisplay.filter((card) => card.question.toLowerCase().includes(e.target.value.toLowerCase()));
		this.setState({
			cardsDisplayed: newDisplay,
			search: e.target.value
		});
	}

	render() {
		const categoryItems = this.props.categories.map((category) => (
			<option key={category.id} value={category.name}>
				{category.name}
			</option>
		));

		return (
			<div style={{ backgroundColor: '#5186ba', height: '100vh' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<h1 align="center">Search</h1>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
						<div style={{ display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
							<label style={{ fontWeight: 'bold' }}> Choose Category</label>
							<select
								style={{ width: '300px' }}
								align="center"
								className="browser-default custom-select"
								name="category"
								onChange={this.onChange}
							>
								<option value="">All Categories</option>
								{categoryItems}
							</select>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
							<label style={{ fontWeight: 'bold' }}>Search Question</label>
							<input
								style={{ width: '300px' }}
								className="form-control"
								type="text"
								name="search"
								value={this.state.search}
								onChange={this.onChangeText}
							/>
						</div>
					</div>
				</div>
				<hr />
				<div>
					<h1 align="center">Cards List</h1>
					<CardsList cards={this.state.cardsDisplayed} deleteCard={this.props.deleteCard} />
				</div>
			</div>
		);
	}
}

CardsPage.propTypes = {
	cards: PropTypes.array.isRequired,
	fetchCards: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	cards: state.cards.items,
	categories: state.categories.items
});

export default connect(mapStateToProps, { fetchCards, deleteCard, fetchCategories })(CardsPage);
