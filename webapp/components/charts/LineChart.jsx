import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';

class LineChart extends Component {
    constructor() {
        super();
        this.createChart = this.createChart.bind(this);
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        select(this.svg).selectAll('g').remove(); // Refresh the chart.
        this.createChart();
    }

    createChart() {
        const { width, height, xKey, yKey, data, lineColor } = this.props;
        const g = select(this.svg).append('g');
        var margin = {top: 20, right: 0, bottom: -10, left: -10};

        var x = scaleBand()
            .range([margin.left, width - margin.right])
            .padding(0.1);
        x.domain(data.map(d => d[xKey]));

        // define element to obtain label size for setting margin on x axis
        const xAxis = g.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(axisBottom(x));

        // append label
        var labels = xAxis.selectAll('g').nodes();
        const marginBottom = max(labels, label => label.getBBox().width);
        // set margin
        margin.bottom = marginBottom + 10;

        const y = scaleLinear()
            .range([height - margin.bottom, margin.top]);

        const chartline = line()
            .x((d) => x(d[xKey]))
            .y((d) => y(d[yKey]));

        y.domain([0, max(data, d => +d[yKey])]).nice();

        // define element to obtain label size for setting margin on x axis
        const yAxis = g.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(axisLeft(y));

        // append label
        labels = yAxis.selectAll('g').nodes();
        const marginLeft = max(labels, label => label.getBBox().width);
        // set margin
        margin.left = marginLeft + 10;

        // reset the range and domain of the x-axis
        x = scaleBand()
            .range([margin.left, width - margin.right])
            .padding(0.1);
        x.domain(data.map(d => d[xKey]));

        g.append('g')
            .attr('transform', `translate(0,${height-margin.bottom})`)
            .call(axisBottom(x)
                .tickSizeOuter(0))
            .selectAll('text')
            .attr('x', 9)
            .attr('y', 0)
            .attr('dy', '.35em')
            .attr('transform', 'rotate(90)')
            .style('text-anchor', 'start');

        // Add the Y Axis
        g.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(axisLeft(y));

        // Add the chartline path.
        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', lineColor)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('stroke-width', 1.5)
            .attr('d', chartline);

        g.selectAll('.dot')
            .data(data)
            .enter().append('circle') // Uses the enter().append() method
            .attr('fill', lineColor)
            .attr('cx', d => x(d[xKey]))
            .attr('cy', d => y(d[yKey]))
            .attr('r', 5);
    }

    render() {
        const { width, height } = this.props;
        return <svg ref={node => this.svg = node}
            width={width}
            height={height}>
        </svg>;
    }
}

LineChart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xKey: PropTypes.string.isRequired,
    yKey: PropTypes.string.isRequired,
    lineColor: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default LineChart;
