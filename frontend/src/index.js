import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { Provider } from 'react-redux';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<Router>
		<Switch>
			<Provider store={store}>
				<App />
			</Provider>
		</Switch>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
