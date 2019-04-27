import React, { Component } from 'react';


class AddSectionTemplate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			subjectTitle: '',
			sectionNumber: '',
			sectionTitle: ''
		}

		this.onChange = this.onChange.bind(this);
		this.postFormData = this.postFormData.bind(this);
	}

	onChange(e) {

		this.setState({ [e.target.name]: e.target.value });

	}

	postFormData(e) {

		e.preventDefault();
		let data = this.state;

		fetch('http://www.microark.io/api/sections/post', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		});
	}

	toUpper(str) {
		return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
	}

	renderSubjectTitleSelector() {
		var subjects = ['',];
		var titles = this.props.data;

		for (var i = 0; i < titles.length; i++) {
			if (subjects.indexOf(titles[i].subjectTitle) == -1) {
         			subjects.push(titles[i].subjectTitle);
			}
		}

		const renderSubjects = subjects.map(x => <option>{this.toUpper(x)}</option>);

		return (
			<div>
			<label htmlFor="subjectTitle">Select Subject: </label>
			<br/>
			<select id="subjectTitle" name="subjectTitle" value={this.state.subjectTitle}>
			  {renderSubjects}
			</select>
			</div>
		);
	}


	renderSectionNumberField() {
		return (
			<div>
			<label htmlFor="sectionNumber">Section Number: </label>
			<br/>
			<input id="sectionNumber" name="sectionNumber" type="text" value={this.state.sectionNumber} />
			</div>
		);
	}

	renderSectionTitleField() {
	return (
			<div>
			<label htmlFor="sectionTitle">Section Title: </label>
			<br/>
			<input id="sectionTitle" name="sectionTitle"  type="text" value={this.state.sectionTitle} />
			</div>
		);
	}

	renderForm() {
		return (
			<div>
			<form onChange= {this.onChange} onSubmit={this.postFormData}>
			  {this.renderSubjectTitleSelector()}
			  {this.renderSectionNumberField()}
			  {this.renderSectionTitleField()}
			  <br/>
			  <button type="submit">Submit</button>
			</form>
			</div>
		);
	}



	render() {
		
		return this.renderForm();

	}
}

export default AddSectionTemplate;
