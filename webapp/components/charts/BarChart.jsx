import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

class BarChart extends Component {
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

    // Horizontal Oreintation Chart
    createChart() {
        const { width, height, xKey, yKey, barColor, data } = this.props;
        // Negative margins, will be changed later
        var margin = {top: 20, right: 0, bottom: -10, left: -10};
        // Append initial group element using a reference to the svg DOM node.
        const g = select(this.svg).append('g');

        const x = scaleLinear()
            .range([0, width - margin.right]);
        x.domain([0, max(data, d => +d[yKey])]).nice();

        const xAxis = g.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(axisBottom(x));

        var labels = xAxis.selectAll('g').nodes();
        const marginBottom = max(labels, label => label.getBBox().width);
        margin.bottom = marginBottom;

        const y = scaleBand()
            .range([height - margin.bottom - margin.top, 0])
            .padding(0.1);

        y.domain(data.map(d => d[xKey]));

        const yAxis = g.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(axisLeft(y));

        labels = yAxis.selectAll('g').nodes();
        const marginLeft = max(labels, label => label.getBBox().width);
        margin.left = marginLeft;

        g.append('g')
            .attr('transform', `translate(${margin.left}, ${height - margin.bottom - margin.top})`)
            .call(axisBottom(x)
                .tickSizeOuter(0))
            .selectAll('text')
            .attr('x', 9)
            .attr('y', 0)
            .attr('dy', '.35em')
            .attr('transform', 'rotate(90)')
            .style('text-anchor', 'start');

        g.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(axisLeft(y));

        g.selectAll()
            .data(data)
            .enter().append('rect')
            .attr('fill', barColor)
            .attr('x', margin.left)
            .attr('y', d => y(d[xKey]))
            .attr('width', d => x(d[yKey]))
            .attr('height', y.bandwidth());
    }

    render() {
        const { width, height } = this.props;
        return <svg ref={node => this.svg = node}
            width={width}
            height={height}>
        </svg>;
    }
}

BarChart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xKey: PropTypes.string.isRequired,
    yKey: PropTypes.string.isRequired,
    barColor: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default BarChart;
