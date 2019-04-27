import React from 'react';
import './style.css';

export function Home() {

    return (
      <div>
	<div>
          <img id="background" src="img/atlanta.jpg" alt="Atlanta skyline"/>
        </div>
        <div className="row">
	  <div className="l">
	     <img id="profile" src="img/profile.png" alt="Profile picture"/>
	  </div>
	  <div className="m">
	    <p>Welcome to the homepage.</p>
          </div>
	  <div className="r"></div>
        </div>
      </div>
    );
  }


