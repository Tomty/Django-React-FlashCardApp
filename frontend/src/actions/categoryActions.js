import { FETCH_CATEGORIES, NEW_CATEGORY } from './types';

export const fetchCategories = () => (dispatch) => {
	fetch('http://tomty.alwaysdata.net/category/').then((res) => res.json()).then((categories) =>
		dispatch({
			type: FETCH_CATEGORIES,
			payload: categories
		})
	);
};

export const createCategory = (categoryData) => (dispatch) => {
	fetch('http://tomty.alwaysdata.net/category/', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(categoryData)
	})
		.then((res) => res.json())
		.then((category) =>
			dispatch({
				type: NEW_CATEGORY,
				payload: category
			})
		);
};
