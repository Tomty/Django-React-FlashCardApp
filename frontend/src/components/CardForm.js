import React, { Component } from 'react';
import classnames from 'classnames';
import './cardForm.css';

class CardForm extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	state = {
		id: this.props.card ? this.props.card.id : null,
		question: this.props.card ? this.props.card.question : '',
		answer: this.props.card ? this.props.card.answer : '',
		category: this.props.card ? this.props.card.category.name : '',
		errors: {},
		done: false
	};

	componentWillReceiveProps = (nextProps) => {
		console.log('PROPS:');
		console.log(nextProps);
		if (this.props.card) {
			this.setState({
				id: nextProps.card.id,
				question: nextProps.card.question,
				answer: nextProps.card.answer,
				catgory: nextProps.card.category.name
			});
		}
	};

	onChange(e) {
		if (!!this.state.errors[e.target.name]) {
			console.log('test');
			let errors = Object.assign({}, this.state.errors);
			delete errors[e.target.name];
			this.setState({
				[e.target.name]: e.target.value,
				errors
			});
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}

		console.log(this.state.category);
	}

	onSubmit(e) {
		e.preventDefault();

		//validation
		let errors = {};
		if (this.state.question === '') errors.question = "Can't be empty";
		if (this.state.answer === '') errors.answer = "Can't be empty";
		this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;

		if (isValid) {
			let cat = this.state.category;
			let id = 0;
			if (cat === '') {
				cat = this.props.categories[0];
			} else cat = this.props.categories.find((el) => (el.name = cat));

			const card = {
				question: this.state.question,
				answer: this.state.answer,
				category: {
					id: cat.id,
					name: cat.name
				}
			};

			console.log('id attribute: ' + this.props.id);

			if (this.state.id) {
				card.id = this.state.id;
				console.log('adding id attribute: ' + this.state.id);
				console.log(card);
			}

			console.log(card);
			this.props.saveCard(card, this.state.id);
			this.setState({ done: true });
		}
	}
	render() {
		const categoryItems = this.props.categories.map((category) => (
			<option key={category.name} value={category.name}>
				{category.name}
			</option>
		));

		const form = (
			<form onSubmit={this.onSubmit}>
				<h1>Add Card</h1>
				<div className={classnames('field', { error: !!this.state.errors.question })}>
					<label>Question {this.state.id}</label>
					<br />
					<input type="text" name="question" onChange={this.onChange} value={this.state.question} />
					<span>{this.state.errors.question}</span>
				</div>
				<br />
				<div className={classnames('field', { error: !!this.state.errors.answer })}>
					<label>Answer</label>
					<br />
					<input type="text" name="answer" onChange={this.onChange} value={this.state.answer} />
					<span>{this.state.errors.answer}</span>
				</div>
				<br />
				<div>
					<label>Category</label>
					<select
						className="browser-default custom-select"
						name="category"
						value={this.state.category}
						onChange={this.onChange}
					>
						{categoryItems}
					</select>
				</div>
				<br />
				<button type="submit" className="btn btn-success">
					Submit
				</button>
			</form>
		);

		return <div>{form}</div>;
	}
}

export default CardForm;
