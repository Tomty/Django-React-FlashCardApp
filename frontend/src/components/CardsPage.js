import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCards, deleteCard } from '../actions/cardActions';
import { fetchCategories } from '../actions/categoryActions';
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
		this.props.fetchCards();
		this.props.fetchCategories();
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
		newDisplay = newDisplay.filter((card) => card.question.includes(e.target.value));
		this.setState({
			cardsDisplayed: newDisplay,
			search: e.target.value
		});
	}

	render() {
		const categoryItems = this.props.categories.map((category) => (
			<option key={category.name} value={category.name}>
				{category.name}
			</option>
		));

		var searchStyle = {
			padding: '10px'
		};

		var selectStyle = {
			width: '300px'
		};

		return (
			<div style={searchStyle} align="center">
				<h1 align="center">Search</h1>
				<label> Choose Category</label>
				<br />
				<select
					align="center"
					style={selectStyle}
					className="browser-default custom-select"
					name="category"
					onChange={this.onChange}
				>
					<option value="">All Categories</option>
					{categoryItems}
				</select>
				<br />
				<label>Search Card</label>
				<br />
				<input
					style={selectStyle}
					type="text"
					name="search"
					value={this.state.search}
					onChange={this.onChangeText}
				/>
				<hr />
				<h1 align="center">Cards List</h1>
				<CardsList cards={this.state.cardsDisplayed} deleteCard={this.props.deleteCard} />
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
