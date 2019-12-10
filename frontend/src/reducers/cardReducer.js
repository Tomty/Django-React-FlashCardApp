import {
	CARD_FETCHED,
	ADD_CARD,
	CARD_UPDATED,
	SET_CARDS,
	CARD_DELETED,
	CATEGORY_UPDATED,
	CATEGORY_DELETED
} from '../actions/types';

const initialState = {
	items: [],
	item: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_CARD:
			return {
				...state,
				items: [ ...state.items, action.payload ]
			};
		case CARD_DELETED:
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload)
			};
		case CARD_UPDATED:
			return {
				...state,
				items: state.items.map((item) => {
					if (item.id === action.payload.id) return action.payload;
					return item;
				})
			};
		case SET_CARDS:
			return {
				...state,
				items: action.payload
			};
		case CARD_FETCHED:
			const index = state.items.findIndex((item) => item.id === action.payload.id);
			if (index > -1) {
				return {
					...state,
					items: state.items.map((item) => {
						if (item.id === action.payload.id) return action.payload;
						return item;
					})
				};
			} else {
				return {
					...state,
					items: [ ...state.items, action.payload ]
				};
			}

		case CATEGORY_UPDATED:
			return {
				...state,
				items: state.items.map((item) => {
					if (item.category.id === action.payload.id) return { ...item, category: action.payload };
					return item;
				})
			};

		case CATEGORY_DELETED:
			return {
				...state,
				items: state.items.filter((item) => item.category.id !== action.payload.id)
			};
		default:
			return state;
	}
}
