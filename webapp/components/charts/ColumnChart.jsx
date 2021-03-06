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
    }

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate() {
        select(this.svg).selectAll('g').remove(); // Refresh the chart.
        this.createChart();
    }

    // Vertical Oreintation Chart
    createChart() {
        const { width, height, xKey, yKey, barColor, data } = this.props;
        const margin = {top: 20, right: 0, bottom: 300, left: 80};

        // Append initial group element using a reference to the svg DOM node.
        const g = select(this.svg).append('g');

        const x = scaleBand()
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = scaleLinear()
            .range([height - margin.bottom, margin.top]);

        x.domain(data.map(d => d[xKey]));
        y.domain([0, max(data, d => +d[yKey])]).nice();

        g.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(axisBottom(x)
                .tickSizeOuter(0));

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
