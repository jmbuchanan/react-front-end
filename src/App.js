import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Tutorial from './Tutorial';
import Admin from './Admin';
import { Application } from './Application';
import { Home } from './Home';



export function App() {

  	return (
		<Router>
			<div className="header">
					<Link className="home" to="/">MicroArk</Link>
			<div className="header-right">
				<ul className="header-right">
					<li><Link to="/java">Java</Link></li>
					<li><Link to="/spring">Spring</Link></li>
					<li><Link to="/apps">Apps</Link></li>
				</ul>
			</div>
			</div>
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/java" component={Tutorial} />
				<Route path="/spring" component={Tutorial} />
				<Route path="/apps" component={Application} />
				<Route path="/admin" component={Admin} />
			</div>
		</Router>
	)};


