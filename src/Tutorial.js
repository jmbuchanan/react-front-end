import React, { Component } from 'react';

class Tutorial extends Component {

  state = {
	  data: [],
  }

  componentDidMount() {

	  const path = window.location.pathname.slice(1);
	  const endpoint = 'http://www.microark.io/api/contents/' + path;

          fetch(endpoint)
	    .then(result => result.json())
	    .then(result => {
		    this.setState({
			    data: result,
		    })
	    })
  }


  renderSubjectTitle(){
	  var title = this.state.data[0].subjectTitle;

          var titleCase = title.charAt(0).toUpperCase() + title.substr(1).toLowerCase(); 

	  return <h1>{titleCase}</h1>;
  }

  renderSectionTitle(i){
	 
	  let section = this.state.data;

	  if (i == 0 || section[i].sectionTitle != section[(i-1)].sectionTitle) {
		  return <h2>{section[i].sectionNumber.toFixed(1) + " " + section[i].sectionTitle}</h2>;
	  }

	  return null;
  }

  renderParagraphText(i) {
	  
	  const { data } = this.state
	  const paragraphText = data[i].paragraphText

	  if (paragraphText != null) {
		  return <p>{paragraphText}</p>;
	  }
	  return null;
  }

  renderCodeExample(i) {
	  
	  const { data } = this.state
	  const codeExample = data[i].codeExample
	  if (codeExample != null) {
		  return <pre>{codeExample}</pre>;
	  }
	  return null;
  }
	

  renderImagePathway(i) {
	  
	  const { data } = this.state
	  const imagePathway = data[i].imagePathway

	  if (imagePathway != null) {
		  return <img src={imagePathway}/>;
	  }
	  return null;
  }

  renderContent() {

	  const { data } = this.state
	  let content = []

	  content.push(this.renderSubjectTitle());

	  for (var i = 0; i < data.length; i++) {
		  content.push(this.renderSectionTitle(i));
		  content.push(this.renderParagraphText(i));
		  content.push(this.renderCodeExample(i));
		  content.push(this.renderImagePathway(i));
	  }

	  return content;

  }
	


  render() {

    const { data } = this.state

    if (data.length == 0) {
	    return (
		    <div className="App">
		    </div>

	    );
    }

    return (
      <div className="App">
        <div className="row">
	  <div className="l"></div>
	  <div className="m">

	    {this.renderContent()}

          </div>
	  <div className="r"></div>
        </div>
      </div>
    );
  }
}

export default Tutorial;
