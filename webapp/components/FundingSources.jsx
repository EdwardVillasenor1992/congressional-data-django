import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import ColumnChart from './charts/ColumnChart';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import Form from './Form';
import getData from '../api/getData';
import mockData from '../mock/data.json';

/**
 * A component that takes a cadidate last name as form input and renders a bar
 * chart with the response data.
 */
class FundingSources extends Component {
    constructor() {
        super();
        this.state = {
            formError: null,
            loading: null,
            data: [],
        };
        this.getFundingSources = this.getFundingSources.bind(this);
    }

    /**
     * Get the funding sources for a particular candidate.
     * @param {string} candidate - The candidate name.
     * @return {undefined}
     */
    getFundingSources(candidate) {
        this.setState({ loading: true });
        const count = 30;
        getData(`api/funding/sources/${candidate}/${count}`, (err, data) => {
            let formError;
            if (err) {
                formError = `${err}`;
            } else if (data.length === 0) {
                formError = `Could not find data for '${candidate}'.`;
            }
            this.setState({ formError, loading: false, data });
        });
    }

    render() {
        const { formError, loading } = this.state;
        let { data } = this.state;
        // Display chart if form was used and API response was successful.
        let displayChart = loading !== null && !loading && !formError;
        if (process.env.NODE_ENV === 'dev') {
            data = mockData;
            displayChart = true;
        }
        return (
            <div>
                <Form
                    onPressEnter={this.getFundingSources}
                    controlLabel='Candidate Last Name'
                    placeholder='Ex: schwarzenegger'
                    error={formError}
                />
                {loading &&
                    <Spinner
                        name="ball-grid-pulse"
                        color="steelblue"
                    />
                }
                {displayChart &&
		  <div>
                    <BarChart data={data}  // Horizontal Bar Chart
                            xKey={'donor'}
                            yKey={'sum'}
                            width={800}
                            height={800}
                            barColor='steelBlue'
                        />
                        <ColumnChart data={data} // Vertical Bar Chart
                            xKey={'donor'}
                            yKey={'sum'}
                            width={800}
                            height={800}
                            barColor='steelBlue'
                        />
                        <LineChart data={data}
                            xKey={'donor'}
                            yKey={'sum'}
                            width={800}
                            height={800}
                            lineColor='steelBlue'
                        />
                    </div>
                }
            </div>
        );
    }
}

export default FundingSources;
