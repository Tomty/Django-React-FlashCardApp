import React, { Component } from 'react';

const NavItem = (props) => {
	const pageURI = window.location.pathname + window.location.search;
	const liClassName = props.path === pageURI ? 'nav-item active' : 'nav-item';
	const aClassName = props.disabled ? 'nav-link disabled' : 'nav-link';
	return (
		<li className={liClassName}>
			<a href={props.path} className={aClassName}>
				{props.name}
				{props.path === pageURI ? <span className="sr-only">(current)</span> : ''}
			</a>
		</li>
	);
};

class Navigation extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand" href="/">
					Home
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<NavItem path="/cards" name="Manage Cards" />
						<NavItem path="/" name="Manage Categries" />
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navigation;
