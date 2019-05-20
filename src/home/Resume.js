import React from 'react';
import { Link } from 'react-router-dom';


export function Resume() {

	var divStyle = {
		textAlign: "center",
	};

	var _listStyle = {
		listStyle: "none",
	};


    return (
	<div>
	<div className="row">
	    <div className="l">
	    </div>
	    <div className="m">
		<div style={divStyle}>
		  <h1>Matt Buchanan</h1>
		  <p>matt_buchanan@homedepot.com</p>
		  <p>(706) 612-5081</p>
		</div>
		
	        <h2>Objective</h2>
		<hr/>
		<p>THD Finance professional transitioning into software development.</p>
	        
	    	<h2>Projects</h2>
	    	<hr/>
	    	<ul>
	    	  <li><strong><Link to="/">MicroArk:</Link></strong> a website built with a modern stack of web development tools 
	    		that hosts tutorials and showcases a few simple applications.</li>
	    	</ul>
	    	
	        <h2>Skills & Proficiencies</h2>
		<hr/>
		<ul>
		  <li><strong>Scripting:</strong> Java, Python, SQL, HTML, CSS, Javascript, VBScript, VBA</li>
		  <li><strong>Frameworks:</strong> Spring Boot, React, Django, Flask, D3.js</li>
	    	  <li><strong>RDBMs: </strong> PostgreSQL, SQLite, Microsoft Access</li>
		  <li><strong>Operating Systems:</strong> Ubuntu 18.04, Windows 10</li>
		</ul>
	    	
		<h2>Work Experience</h2>
		<hr/>
		<h3>The Home Depot</h3>
		<p><em>Senior Financial Analyst, Technology Finance (July 2017 - Present)</em></p>
		<ul>
			<li>Streamlining financial reporting with SQLite and Access implementations</li>
			<ul>
	    			<li>Reduced generation time of bi-weekly spend reports by 80% by utilizing SQL and Python pandas</li>
	    			<li>Automated plan transfers with SQLite and SAP GUI scripting saving roughly 10 hours a month of manual entry and resulting in 99% report accuracy</li>
				<li>Incorporated SQL and Python pandas scripts to reduce creation time for regular commitments reports by an hour</li>
			</ul>
	    		<br/>
			<li>Automating SAP data entry and extraction with GUI Scripting and VBScript</li>
			<ul>
				<li>Automated budget distribution in SAP that saves Senior Accountant 8 hours of work at the beginning of the fiscal year and many working days throughout the year</li>
				<li>Automated document attachment for new projects that reduced processing time from 6 hours to 30 minutes at the turn of the year</li>
			</ul>
	    		<br/>
			<li>Transforming and aggregating financial data for monthly Tableau reporting</li>
			<ul>
				<li>Created dashboards to visualize labor actuals, forecast, and plan for all experiences across Technology</li>
				<li>Wrote custom SQL queries within Tableau that reduced data preparation time by 90% for monthly financials dashboard</li>
				<li>Regularly consult with Project Managers for dashboard feedback to identify meaningful KPIs</li>
			</ul>
		</ul>
		
	    	<p><em>Financial Analyst, Technology Finance (March 2016 - July 2017)</em></p>

		<ul>
	    		<li>Created efficiences in reporting with VBA and Excel modeling</li>
	    		<ul>
	    			<li>Utilized robust Excel models to reduce 6 hour weekly reporting process to 2 hours</li>
	    			<li>Wrote VBA scripts to prep data for Tableau dashboards reducing the month-end preparation time by 90%.</li>
	    		</ul>
	    	</ul>

		<h2>Education</h2>
		<hr/>
		<h3>University of Georgia</h3>
		<p><em>Bachelor of Business Administration, Finance (December 2015)</em></p>
	    	
		<h2>Other Interests</h2>
	    	<hr/>
	    	<ul>
	    		<li>ALTA League Tennis; jazz and blues piano; guitar; drums; ping pong; Roman History; World War II history; international affairs; cooking; searching for the best wings in Atlanta; gaming; The Sopranos; Game of Thrones</li>
	    	</ul>

	    </div>
	    <div className="r">
	    </div>
	</div>
	</div>
    );
  }


