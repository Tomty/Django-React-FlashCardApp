import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

import { fetchCards } from '../../actions/cardActions';
import { fetchCategories, updateCategory, createCategory, deleteCategory } from '../../actions/categoryActions';

class CategoriesPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newCategory: '',
			editIds: [],
			editItems: [],
			showAlert: false,
			categoryToDelete: {}
		};

		this.onEdit = this.onEdit.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onChangeEdit = this.onChangeEdit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onChangeAdd = this.onChangeAdd.bind(this);
		this.showAlert = this.showAlert.bind(this);
	}

	componentWillMount() {
		if (this.props.categories.length === 0) {
			this.props.fetchCategories();
		}
		if (this.props.cards.length === 0) {
			this.props.fetchCards();
		}
	}

	onEdit(e, category) {
		this.setState({
			editItems: [ ...this.state.editItems, category ],
			editIds: [ ...this.state.editIds, category.id ]
		});
	}

	onSave(e, category) {
		const cat = this.state.editItems.find((item) => item.id === category.id);
		if (cat.name !== '') {
			this.props.updateCategory(cat);
			this.onCancel(e, category);
		}
	}

	onCancel(e, category) {
		this.setState({
			editItems: this.state.editItems.filter((item) => item.id !== category.id),
			editIds: this.state.editIds.filter((item) => item !== category.id)
		});
	}

	onChangeEdit(e, category) {
		let d = this.state.editItems.filter((item) => item.id !== category.id);
		this.setState({ editItems: [ ...d, { id: category.id, name: e.target.value } ] });
	}

	onChangeAdd(e) {
		this.setState({
			newCategory: e.target.value
		});
	}

	onAdd(e) {
		if (this.state.newCategory !== '') this.props.createCategory({ name: this.state.newCategory });
	}

	onDelete() {
		this.props.deleteCategory(this.state.categoryToDelete);
		this.setState({ showAlert: false, categoryToDelete: {} });
	}

	showAlert(e, category) {
		this.setState({ showAlert: true, categoryToDelete: category });
	}

	render() {
		const categoriesList = this.props.categories.map(
			(category) =>
				this.state.editIds.includes(category.id) ? (
					<tr key={category.id}>
						<td align="center"> {category.id}</td>
						<td>
							<input
								className="form-contrl"
								defaultValue={category.name}
								onChange={(e) => this.onChangeEdit(e, category)}
								disabled={this.state.categoryToDelete.id}
							/>
						</td>
						<td>{this.props.cards.filter((item) => item.category.id === category.id).length}</td>
						<td>
							<button
								style={{ marginRight: '5px' }}
								className="btn btn-success"
								onClick={(e) => this.onSave(e, category)}
								disabled={this.state.categoryToDelete.id}
							>
								Save
							</button>
							<button
								style={{ marginLeft: '5px' }}
								className="btn btn-danger"
								onClick={(e) => this.onCancel(e, category)}
								disabled={this.state.categoryToDelete.id}
							>
								Cancel
							</button>
						</td>
					</tr>
				) : (
					<tr key={category.id}>
						<td align="center"> {category.id}</td>
						<td>{category.name}</td>
						<td>{this.props.cards.filter((item) => item.category.id === category.id).length}</td>
						<td>
							<button
								style={{ marginRight: '5px' }}
								className="btn btn-info"
								disabled={this.state.categoryToDelete.id}
								onClick={(e) => this.onEdit(e, category)}
							>
								Edit
							</button>
							<button
								style={{ marginLeft: '5px' }}
								className="btn btn-danger"
								disabled={this.state.categoryToDelete.id}
								onClick={(e) => this.showAlert(e, category)}
							>
								Delete
							</button>
						</td>
					</tr>
				)
		);

		return (
			<div>
				<h1 align="center">Categories List</h1>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Alert style={{ width: 'auto' }} show={this.state.showAlert} variant="danger">
						<Alert.Heading>
							You are about to delete the category {this.state.categoryToDelete.name} !
						</Alert.Heading>
						<p>
							If you delete this category, all the cards belonging to {this.state.categoryToDelete.name}{' '}
							will be deleted as well
						</p>
						<hr />
						<div className="d-flex justify-content-center">
							<button
								style={{ marginRight: '5px' }}
								className="btn btn-danger"
								onClick={() => this.onDelete()}
							>
								Delete
							</button>
							<button
								style={{ marginLeft: '5px' }}
								className="btn btn-danger"
								onClick={() => this.setState({ showAlert: false, categoryToDelete: {} })}
							>
								Cancel
							</button>
						</div>
					</Alert>
				</div>
				<div style={{ padding: '10px' }}>
					<Table striped bordered hover size="sm">
						<thead>
							<tr>
								<th align="center">#</th>
								<th>Category Name</th>
								<th>Number of cards</th>
							</tr>
						</thead>
						<tbody>
							{categoriesList}
							<tr>
								<td align="center">#</td>
								<td>
									<input
										onChange={(e) => this.onChangeAdd(e)}
										value={this.state.newCategory}
										className="form-control"
										disabled={this.state.categoryToDelete.id}
									/>
								</td>
								<td>0</td>
								<td>
									<button
										className="btn btn-success"
										disabled={this.state.categoryToDelete.id}
										onClick={(e) => this.onAdd(e)}
									>
										Add
									</button>
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
}

CategoriesPage.propTypes = {
	categories: PropTypes.array.isRequired,
	fetchCategories: PropTypes.func.isRequired,
	updateCategory: PropTypes.func.isRequired,
	deleteCategory: PropTypes.func.isRequired,
	fetchCards: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	categories: state.categories.items,
	cards: state.cards.items
});

export default connect(mapStateToProps, {
	fetchCategories,
	fetchCards,
	updateCategory,
	createCategory,
	deleteCategory
})(CategoriesPage);
