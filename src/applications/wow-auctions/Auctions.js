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
			<p>This application tracks commodity prices in the latest expansion of World of Warcraft.
			  I use the Python Requests library to pull auction data from the Blizzard API hourly, 
			  SQL to transform the data, a Flask endpoint to serve the JSON 
			  (<a href="/flaskapi/auctions">/flaskapi/auctions</a>), and the D3.js library for visualization.
			  The data is from the Korgath server and the prices in the line chart are shown as 
			  a daily average.</p>
			<h2>Historic Commodity Prices</h2>
		        <hr/>
			<br/>
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
			<br/>
			<br/>
			<br/>
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
		

                // create svg container with g inside. Transform, translate creates padding
                // for the graph within the svg container

		d3.select("svg").remove();

                var svg = d3.select(".graph")
                        .append("svg")
				.attr("viewBox", "0 0 500 275")
                                .attr("width", "100%")
				.attr("max-width", "500px")
                        .append("g")
                                .attr("transform", "translate(35, 25)");

                const tParser = d3.timeParse('%m/%d/%Y')

                //Add x axis as date
                var x = d3.scaleTime()
                        .domain(d3.extent(this.state.data, function(d) {return tParser(d.date)}))
                        .range([0, 370]);
                
		svg.append("g")
                        .attr("transform", "translate(0, 175)")
			.attr("width", 370)
                        .call(d3.axisBottom(x)
                                .tickFormat(d3.timeFormat("%m-%d"))
                                .ticks(d3.timeDay))
                        .selectAll("text")
                                .attr("transform", "rotate(-60) translate(-20, 0)")
				.attr("font-size", 8);

                //Add y axis as price
                var y = d3.scaleLinear()
                        .domain(d3.extent(items, function(d) {return d.price}))
                        .range([ 175, 0 ]);
                
		svg.append("g")
                        .call(d3.axisLeft(y))
			.selectAll("text")
			.attr("font-size", 8);


		for (var i = 0; i < names.length; i++) {

			var data = this.getItemData(names[i]);

			svg.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", COLORS[i])
				.attr("stroke-width", 1)
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
			.attr("width", 7)
			.attr("height", 7)
			.attr("x", 385)
			.attr("y", function(d, i) {return 12.5*i + 25});


		legend.append("text")
			.attr("x",  395)
			.attr("y", function(d, i) {return 12.5*i + 31.5})
			.attr("font-size", 8)
			.text(function(d, i) {return names[i]});


	}


	getCurrent(item){

		let data = this.getItemData(item);

		return data[data.length -1].price;
	}

			

	

	getHigh(item) {

		let data = this.getItemData(item);

		let high = 0;

		for (var i = 0; i < data.length; i++) {
			if (data[i].price > high) {
				high = data[i].price;
			}
		}

		return high;

	}

	getLow(item) {

		let data = this.getItemData(item);

		let low;

		for (var i = 0; i < data.length; i++) {
			if (i == 0) {
				low = data[i].price;
			}
			if (data[i].price < low) {
				low = data[i].price;
			}
		}

		return low;

	}


	getAverage(item) {

		let data = this.getItemData(item);

		let total = 0;

		for (var i = 0; i < data.length; i++) {
			total += data[i].price;
		}

		let average = total / data.length;

		return average.toFixed(0);

	}

	renderTable() {

		if (this.state.data.length == 0) {
			return null;
		}


		let items = this.getItemsByCategory();
		let names = this.getItemNames(items);

		//Current, high, low, 2-wk average
	

		let table = [];

		const header = (
			<tr>
				<th>Item</th>
				<th>Current</th>
				<th>High</th>
				<th>Low</th>
				<th>2-wk Avg</th>
			</tr>
		);

		table.push(header);

		for (var i = 0; i < names.length; i++) {
			let name = names[i];
			let current = this.getCurrent(name);
			let high = this.getHigh(name);
			let low = this.getLow(name);
			let average = this.getAverage(name);

			let row = (
				<tr>
				  <td>{name}</td>
				  <td>{current + "g"}</td>
				  <td>{high + "g"}</td>
				  <td>{low + "g"}</td>
				  <td>{average + "g"}</td>
				</tr>
			);

			table.push(row);
		}

		return (
			<div>
			<table>
			{table}
			</table>
			</div>
		);


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
			    {this.renderTable()}
			  </div>
			  <div className="r"></div>
			</div>
		      </div>
		);
	}

}


export default Auctions;
