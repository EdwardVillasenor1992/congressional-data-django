import React, { Component } from 'react'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max, merge } from 'd3-array'
import { select, selectAll } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'

class BarChart extends Component {

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        select(this.svg).selectAll('g').remove(); // Refresh the chart.
        this.createChart();
    }

// Horizontal Oreintation Chart

    createChart = () => {
        const { width, height, xKey, yKey, barColor, data } = this.props;
	// Append initial group element using a reference to the svg DOM node.
	const g = select(this.svg).append('g');

	// Left margin needs to be -10 as if left >= 0, then two lines will be drawn
	var margin = {top: 20, right: 350, bottom: 80, left: -10};

	const x = scaleLinear()
		.range([0, width - margin.right])

	const y = scaleBand()
		.range([height - margin.bottom - margin.top, 0])
		.padding(0.1)
			
	x.domain([0, max(data, d => +d[yKey])]).nice();
	y.domain(data.map(d => d[xKey]));

        const yAxis = g.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(axisLeft(y));

        const labels = yAxis.selectAll('g').nodes();
        const marginLeft = max(labels, label => label.getBBox().width);

	margin.left = marginLeft * 10;			

	g.append('g') 
		.attr('transform',`translate(${margin.left}, ${height - margin.bottom - margin.top})`)
		.call(axisBottom(x)
		.tickSizeOuter(0))
		.selectAll('text')
                      .attr('x', 9)
                      .attr('y', 0)
                      .attr('dy', '.35em')
                      .attr('transform', 'rotate(80)')
                      .style('text-anchor', 'start')

	g.append('g')
		.attr('transform', `translate(${margin.left}, 0)`) 
		.call(axisLeft(y))

	g.selectAll()
		.data(data)
		.enter().append('rect')
			.attr('fill', barColor)
			.attr('x', d => margin.left)
			.attr('y', d => y(d[xKey]))
			.attr('width', d => x(d[yKey]))
			.attr('height', d => y.bandwidth());
    }

    render() {
        const { width, height } = this.props;
        return <svg ref={node => this.svg = node}
            width={width}
            height={height}>
        </svg>
    }
}
export default BarChart
