import React from 'react';

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
	    <h1>About MicroArk</h1>
	    <p>MicroArk is a website built with a modern stack of web development 
	    tools. It is a project that I started with the goal of learning about 
	    how websites work today. This site relies on Spring Boot as the back 
	    end for the tutorial sections-- Java and Spring-- and Flask as the 
	    back end for the Auctions app. The front end is 
	    built with React.
	    The site is currently hosted on an Ubuntu 18.04 machine with NGINX as 
	    the HTTP server and the data is maintained in a PostgreSQL database.</p>
	    <p>Check out the source code here: <a href="https://github.com/jmbuchanan" target="_blank">GitHub</a></p>
	    <p>And my work experience here: <a href="/resume">Resume</a></p>
          </div>
	  <div className="r"></div>
        </div>
      </div>
    );
  }


