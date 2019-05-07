import React, { Component } from 'react';
import * as d3 from 'd3';


class Auctions extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			category: 'Enchanting',
		};

		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount() {

	  const endpoint = 'http://www.microark.io/flaskapi/auctions';

          fetch(endpoint)
	    .then(result => result.json())
	    .then(result => {
		    this.setState({
			    data: result,
		    })
	    });
        }

	handleChange(e) {
		this.setState({category: e.target.value});
	}

	renderIntro(){
		return (
			<div>
			<h1>WoW Auction Application</h1>
			<p>This application pulls auction data from the Blizzard API hourly. It tracks
			  the price of the newest commodities that were added with the latest 
			  expansion, Battle for Azeroth. I decided to pull the data from the 
			  Korgath server, because it is the server that I have played on historically. 
			  The prices on the graph below are a daily average. </p>
			</div>
		);
	}

	renderCategoryDropDown() {
		if (this.state.data.length == 0) {
			return null;
		}

		let categories = [];

		for (var i = 0; i < this.state.data.length; i++) {
			if (!categories.includes(this.state.data[i].category)) {
				categories.push(this.state.data[i].category);
			}
		}

		categories.sort();


		const renderCategories = categories.map(x => <option>{x}</option>);

		return (
			<div>
			<label>Select Category: </label>
			<br/>
			<select value={this.state.category} onChange={(e) => this.handleChange(e)} >
			  {renderCategories}
			</select>
			</div>
		);

		

	}

	getItemsByCategory() {
		
		let dataByCategory = this.state.data;

		let items = [];

		for (var i = 0; i < dataByCategory.length; i++) {
			if (dataByCategory[i].category == this.state.category) {
				items.push(dataByCategory[i]);
			}
		}

		return items;

	}

	getItemNames(items) {

		let names = [];

		for (var i = 0; i < items.length; i++) {

			if (!names.includes(items[i].name)) {
				names.push(items[i].name);
			}
		}

		return names;
	}

	getItemData(item) {
		
		let data = this.state.data;
		let results = [];

		for (var i = 0; i < data.length; i++) {

			if (data[i].name == item) {
				results.push(data[i]);
			}
		}

		return results;

	}

	renderGraph() {


		const COLORS = ['midnightblue', 'firebrick', 'forestgreen', 'gold',
			'darkmagenta', 'darkorange', 'hotpink', 'lightslategrey',
			'saddlebrown', 'thistle', 'darkcyan', 'aqua',
			'fuchsia', 'red', 'yellow', 'blue', 'green']
			

		if (this.state.data.length == 0) {
			return <p>Loading...</p>;
		}

		let items = this.getItemsByCategory();
		let names = this.getItemNames(items);
		
		
		 
                // setting dimensions and padding for graph
                var margin = {top: 10, right: 30, bottom: 40, left: 60},
                        width = 600- margin.left - margin.right,
                        height = 600/1.8 - margin.top - margin.bottom;


                // create svg container with g inside. Transform, translate creates padding
                // for the graph within the svg container

		d3.select("svg").remove();


                var svg = d3.select(".graph")
                        .append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom + 30*names.length)
                        .append("g")
                                .attr("transform",
                                        "translate(" + margin.left + "," + margin.top + ")");

                const tParser = d3.timeParse('%m/%d/%Y')

                //Add x axis as date
                var x = d3.scaleTime()
                        .domain(d3.extent(this.state.data, function(d) {return tParser(d.date)}))
                        .range([0, width]);
                
		svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
			.attr("width", width)
                        .call(d3.axisBottom(x)
                                .tickFormat(d3.timeFormat("%m-%d"))
                                .ticks(d3.timeDay))
                        .selectAll("text")
                                .attr("transform", "rotate(-70) translate(-25, -5)");

                //Add y axis as price
                var y = d3.scaleLinear()
                        .domain(d3.extent(items, function(d) {return d.price}))
                        .range([ height, 0 ]);
                
		svg.append("g")
                        .call(d3.axisLeft(y));

		for (var i = 0; i < names.length; i++) {

			var data = this.getItemData(names[i]);

			svg.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", COLORS[i])
				.attr("stroke-width", 2)
				.attr("d", d3.line()
					.x(function(d) { return x(tParser(d.date)) })
					.y(function(d) { return y(d.price) }));
		}

		let legend = svg.selectAll(".legend")
			.data(names)
			.enter()
			.append("g");

		legend.append("rect")
			.attr("fill", function(d, i) {return COLORS[i]})
			.attr("width", 10)
			.attr("height", 15)
			.attr("y", function(d, i) {return height + margin.top + margin.bottom + 20*i});

		legend.append("text")
			.attr("y", function(d, i) {return height + margin.top + margin.bottom + 14 + 20*i})
			.attr("x", 20)
			.text(function(d, i) {return names[i]});


	}

	render() {
		
		return (
		      <div className="App">
			<div className="row">
			  <div className="l"></div>
			  <div className="m">
			    {this.renderIntro()}
			    {this.renderCategoryDropDown()}
			    {this.renderGraph()}
			    <div className="graph"></div>
			  </div>
			  <div className="r"></div>
			</div>
		      </div>
		);
	}

}


export default Auctions;
