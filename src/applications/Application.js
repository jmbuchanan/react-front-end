import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export function Application() {

    return (
      <div>
        <div class="row">
	  <div class="l"></div>
	  <div class="m">

	    <h1>Applications</h1>

	    <p>Here is a list of applications that I have built:</p>

	    <ul>
	    <li><Link to="/apps/auctions">WoW Auction Application</Link></li>
	    </ul>
          </div>
	  <div class="r"></div>
        </div>
      </div>
    );
}

