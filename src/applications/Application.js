import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export function Application() {

    return (
      <div>
        <div class="row">
	  <div class="l"></div>
	  <div class="m">

	    <h1>Applications</h1>

	    <p>This section is in progress.</p>
	    <p><Link to="/apps/auctions">WoW Auctions</Link></p>

          </div>
	  <div class="r"></div>
        </div>
      </div>
    );
}

