import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveCard, fetchCard, updateCard } from '../actions/cardActions';
import { fetchCategories } from '../actions/categoryActions';
import CardForm from './CardForm';

class CardFormPage extends React.Component {
	state = {
		redirect: false
	};

	componentDidMount = () => {
		const { match } = this.props;
		if (match.params.id) {
			this.props.fetchCard(match.params.id);
		}
		this.props.fetchCategories();
	};

	saveCard = (card, id) => {
		if (id) {
			this.props.updateCard(card);
			setTimeout(() => this.setState({ redirect: true }), 200);
		} else {
			this.props.saveCard(card);
			setTimeout(() => this.setState({ redirect: true }), 200);
		}
	};

	render() {
		return (
			<div>
				{this.state.redirect ? (
					<Redirect to="/cards" />
				) : (
					<CardForm card={this.props.card} saveCard={this.saveCard} categories={this.props.categories} />
				)}
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	const { match } = props;
	if (match.params.id) {
		return {
			card: state.cards.items.find((item) => item.id.toString() === match.params.id),
			categories: state.categories.items
		};
	}

	return { card: null, categories: state.categories.items };
}

export default connect(mapStateToProps, { saveCard, fetchCard, updateCard, fetchCategories })(CardFormPage);
