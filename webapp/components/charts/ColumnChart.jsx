import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

class ColumnChart extends Component {
    constructor() {
        super();
        this.createChart = this.createChart.bind(this);
        this.createLeftMargin = this.createLeftMargin.bind(this);
        this.createBottomMargin = this.createBottomMargin.bind(this);
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        select(this.svg).selectAll('g').remove(); // Refresh the chart.
        this.createChart();
    }

    //Dynamically create the left margin
    createLeftMargin() {
        const { width, height, xKey, yKey, barColor, data } = this.props;
        // Negative margins, will be changed later
        const margin = {top: 20, right: 0, bottom: -10, left: -10};
        // Append initial group element using a reference to the svg DOM node.
        const g = select(this.svg).append('g');

        const y = scaleLinear()
            .range([height - margin.bottom, margin.top]);
        y.domain([0, max(data, d => +d[yKey])]).nice();

        // define element to obtain label size for setting margin on y axis
        const yAxis = g.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(axisLeft(y));

        // append label
        const labels = yAxis.selectAll('g').nodes();
        const marginLeft = max(labels, label => label.getBBox().width);

        // set margin
        return marginLeft + 10;
    }

    // Dynamically create the bottom margin
    createBottomMargin() {
        const { width, height, xKey, yKey, barColor, data } = this.props;
        // Negative margins, will be changed later
        const margin = {top: 20, right: 0, bottom: -10, left: -10};
        // Append initial group element using a reference to the svg DOM node.
        const g = select(this.svg).append('g');

        const x = scaleBand()
            .range([margin.left, width - margin.right])
            .padding(0.1);
        x.domain(data.map(d => d[xKey]));

        // define element to obtain label size for setting margin on x axis
        const xAxis = g.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(axisBottom(x));

        // append label
        const labels = xAxis.selectAll('g').nodes();
        const marginBottom = max(labels, label => label.getBBox().width);

        // set margins
        return marginBottom + 10;
    }

    // Vertical Oreintation Chart
    createChart() {
        const { width, height, xKey, yKey, barColor, data } = this.props;
        // Negative margins, will be changed later
        const margin = {top: 20, right: 0, bottom: this.createBottomMargin(), left: this.createLeftMargin()};

        // Append initial group element using a reference to the svg DOM node.
        const g = select(this.svg).append('g');

        const x = scaleBand()
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = scaleLinear()
            .range([height - margin.bottom, margin.top]);

        x.domain(data.map(d => d[xKey]));
        y.domain([0, max(data, d => +d[yKey])]).nice();

        // Add X Axis
        g.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(axisBottom(x)
                .tickSizeOuter(0))
            .selectAll('text')
            .attr('x', 9)
            .attr('y', 0)
            .attr('dy', '.35em')
            .attr('transform', 'rotate(90)')
            .style('text-anchor', 'start');

        // Add Y Axis
        g.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(axisLeft(y));

        g.selectAll()
            .data(data)
            .enter().append('rect')
            .attr('fill', barColor)
            .attr('x', d => x(d[xKey]))
            .attr('y', d => y(d[yKey]))
            .attr('width', x.bandwidth())
            .attr('height', d => height - margin.bottom - y(d[yKey]));
    }

    render() {
        const { width, height } = this.props;
        return <svg ref={node => this.svg = node}
            width={width}
            height={height}>
        </svg>;
    }
}

ColumnChart.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xKey: PropTypes.string.isRequired,
    yKey: PropTypes.string.isRequired,
    barColor: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default ColumnChart;
