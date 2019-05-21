import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AddSectionTemplate from './templates/AddSectionTemplate';
import DeleteSectionTemplate from './templates/DeleteSectionTemplate';
import AddContentTemplate from './templates/AddContentTemplate';
import DeleteContentTemplate from './templates/DeleteContentTemplate';

//Utility function
function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1); 
}


//Dynamically renders forms to update or delete sections and contents within the site
//This mostly handles the logic of which form to render. Forms found in "templates" directory

class Form extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	//When an add/delete content/section button is selected, query api	
	componentDidUpdate(prevProps) {
		if (this.props.action !== prevProps.action || this.props.name != prevProps.name ) {
			this.queryApi();
		}
	}

	//need a better way to handle plural
	queryApi() {

	  const endpoint = 'http://www.microark.io/api/' + this.props.name + "s";

          fetch(endpoint)
	    .then(result => result.json())
	    .then(result => {
		    this.setState({
			    data: result,
		    })
	    });
        }


	//button selection drives api call and resulting form
	render() {

		switch(this.props.action + " " + this.props.name) {
			case " ":
				return null;
				break;

			case "add section":
				return (
					<div>
					<h2>{capitalizeFirstLetter(this.props.action) + " " +
						capitalizeFirstLetter(this.props.name)}</h2>
					<hr/>
					<AddSectionTemplate data={this.state.data} />
					</div>
				);
				break;

			case "delete section":
				return (
					<div>
					<h2>{capitalizeFirstLetter(this.props.action) + " " +
						capitalizeFirstLetter(this.props.name)}</h2>
					<hr/>
					<DeleteSectionTemplate data={this.state.data} />
					</div>
				);
				break;

			case "add content":
				return (
					<div>
					<h2>{capitalizeFirstLetter(this.props.action) + " " +
						capitalizeFirstLetter(this.props.name)}</h2>
					<hr/>
					<AddContentTemplate data={this.state.data} />
					</div>
				);
				break;

			case "delete content":
				return (
					<div>
					<h2>{capitalizeFirstLetter(this.props.action) + " " +
						capitalizeFirstLetter(this.props.name)}</h2>
					<hr/>
					<DeleteContentTemplate data={this.state.data} />
					</div>
				);
				break;

		}

	}
}


class FormSelector extends Component {

	render() {

		return (
			<tr>
			  <td> {capitalizeFirstLetter(this.props.name)}</td>
			  <td> <button onClick={() => this.props.buttonClick('add', this.props.name)}>Add</button></td>
			  <td><button onClick={() => this.props.buttonClick('delete', this.props.name)}>Delete</button></td>
			</tr>
		);
	}
}


class Admin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			action: '',
			name: ''
		}
	}

	buttonClick(action, name) {
		this.setState({action: action, name: name})
	}


	render() {
		return(
			<div>
			  <div class="row">
			    <div class="l">
			    </div>
			    <div class="m">
			      <h1>Admin Console</h1>
			      <hr/>
			      <FormSelector name="content" buttonClick={this.buttonClick.bind(this)} />
			      <FormSelector name="section" buttonClick={this.buttonClick.bind(this)} />
			      <Form action={this.state.action} name={this.state.name} /> 
			    </div>
			    <div class="r">
			    </div>
			  </div>
			</div>
		);
	}
}


export default Admin;
