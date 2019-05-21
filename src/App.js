import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';

import Tutorial from './tutorials/Tutorial';
import Admin from './admin/Admin';
import { Application } from './applications/Application';
import Auctions from './applications/wow-auctions/Auctions';
import { Home } from './home/Home';
import { Resume } from './home/Resume';

//Contains header of website and mappings for URLs to components

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
				<Route path="/apps/auctions" component={Auctions} />
				<Route exact path="/apps" component={Application} />
				<Route path="/admin" component={Admin} />
				<Route path="/resume" component={Resume} />

			</div>
		</Router>
	)};


