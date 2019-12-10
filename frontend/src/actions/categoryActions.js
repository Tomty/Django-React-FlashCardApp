import { SET_CATEGORIES, ADD_CATEGORY, CATEGORY_UPDATED, CATEGORY_DELETED } from './types';

export function setCategories(categories) {
	return {
		type: SET_CATEGORIES,
		payload: categories
	};
}

export function addCategory(category) {
	return {
		type: ADD_CATEGORY,
		payload: category
	};
}

export function categoryUpdated(category) {
	return {
		type: CATEGORY_UPDATED,
		payload: category
	};
}

export function categoryDeleted(category) {
	return {
		type: CATEGORY_DELETED,
		payload: category
	};
}

export const fetchCategories = () => (dispatch) => {
	fetch('http://tomty.alwaysdata.net/api/category/')
		.then((res) => res.json())
		.then((categories) => dispatch(setCategories(categories)));
};

export const createCategory = (categoryData) => (dispatch) => {
	fetch('http://tomty.alwaysdata.net/api/category/', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(categoryData)
	})
		.then((res) => res.json())
		.then((category) => dispatch(addCategory(category)));
};

export const updateCategory = (categoryData) => (dispatch) => {
	fetch('http://tomty.alwaysdata.net/api/category/' + categoryData.id + '/', {
		method: 'PUT',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(categoryData)
	})
		.then((res) => res.json())
		.then((category) => dispatch(categoryUpdated(category)));
};

export const deleteCategory = (categoryData) => (dispatch) => {
	fetch('http://tomty.alwaysdata.net/api/category/' + categoryData.id + '/', {
		method: 'DELETE',
		headers: { 'content-type': 'application/json' }
	})
		.then((res) => res.text())
		.then((cateory) => dispatch(categoryDeleted(categoryData)));
};
