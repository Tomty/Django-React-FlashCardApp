import React, { Component } from 'react';
import './App.css';

import Navigation from './components/navigation/Navigation';
import { Route } from 'react-router-dom';
import CardsPage from './components/Cards/CardsPage';
import CardFormPage from './components/Cards/CardFormPage';
import CategoriesPage from './components/Categories/CategoriesPage';
import HomePage from './components/Home/HomePage';

class App extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<Route exact path="/" component={HomePage} />
				<Route exact path="/cards" component={CardsPage} />
				<Route path="/cards/new" component={CardFormPage} />
				<Route path="/card/:id" component={CardFormPage} />
				<Route path="/categories" component={CategoriesPage} />
			</div>
		);
	}
}

export default App;
