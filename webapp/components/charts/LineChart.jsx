import React, { Component } from 'react'
import { scaleLinear, scaleBand, scaleTime } from 'd3-scale';
import { max, extent } from 'd3-array'
import { select, selectAll } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { line } from 'd3-shape'

class LineChart extends Component {

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        select(this.svg).selectAll('g').remove(); // Refresh the chart.
        this.createChart();
    }

    createChart = () => {
        const { width, height, xKey, yKey, data, lineColor } = this.props;		
	const g = select(this.svg).append('g');

        var margin = {top: 20, right: 0, bottom: -10, left: 80};

        const x = scaleBand()
                .range([margin.left, width - margin.right])
                .padding(0.1)
        x.domain(data.map(d => d[xKey]));

        const xAxis = g.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(axisBottom(x));

        const labels = xAxis.selectAll('g').nodes();
        const marginBottom = max(labels, label => label.getBBox().width);

        margin.bottom = marginBottom * 10;
        
        const y = scaleLinear()
                .range([height - margin.bottom, margin.top])
        y.domain([0, max(data, d => +d[yKey])]).nice();

	const chartline = line()
		.x(function(d){return x(d[xKey]);})
		.y(function (d){return y(d[yKey]);});		

	// Add the X Axis
	g.append("g")
 	    .attr("transform", `translate(0,${height-margin.bottom})`)
  	    .call(axisBottom(x))
        .selectAll('text')
            .attr('x', 9)
            .attr('y', 0)
            .attr('dy', '.35em')
            .attr('transform', 'rotate(90)')
            .style('text-anchor', 'start')

	// Add the Y Axis
	g.append("g")
	    .attr('transform', `translate(${margin.left},0)`)
	    .call(axisLeft(y))

	// Add the chartline path.
	g.append("path")
   	    .datum(data)
    	    .attr("fill", "none")
    	    .attr("stroke", lineColor)
    	    .attr("stroke-linejoin", "round")
    	    .attr("stroke-linecap", "round")
    	    .attr("stroke-width", 1.5)
    	    .attr("d", chartline)

        g.selectAll(".dot")
	    .data(data)
	  .enter().append("circle") // Uses the enter().append() method
	    .attr("fill", lineColor)
	    .attr("cx", function(d) { return x(d[xKey]) })
	    .attr("cy", function(d) { return y(d[yKey]) })
	    .attr("r", 5);


   }
    render() {
	const { width, height } = this.props;
        return <svg ref={node => this.svg = node}
            width={width}
            height={height}>
        </svg>
    }
}
export default LineChart
