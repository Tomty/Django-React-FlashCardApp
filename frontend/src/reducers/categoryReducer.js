import { SET_CATEGORIES, ADD_CATEGORY, CATEGORY_UPDATED, CATEGORY_DELETED } from '../actions/types';

const initialState = {
	items: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CATEGORIES:
			return {
				...state,
				items: action.payload
			};
		case ADD_CATEGORY:
			return {
				...state,
				items: [ ...state.items, action.payload ]
			};
		case CATEGORY_UPDATED:
			return {
				...state,
				items: state.items.map((item) => {
					if (item.id === action.payload.id) return action.payload;
					return item;
				})
			};
		case CATEGORY_DELETED:
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload.id)
			};
		default:
			return state;
	}
}
