import React, { Component } from 'react';
import { Row, Grid, Alert } from 'react-bootstrap/lib';
import Spinner from 'react-spinkit';
import Form from './Form';
import getData from '../api/getData';
import mockData from '../mock/data.json';
import BarChart from './charts/BarChart';

class AvgDonations extends Component {
    constructor() {
        super();
        this.state = {
            formError: null,
            loading: null,
            data: [],
        };
        this.getElectionYear = this.getElectionYear.bind(this);
        this.getContributions = this.getContributions.bind(this);
    }

    /**
     * Get the average donation per election cycle win
     * @param {string} year - The election cycle year
     * @return {undefined}
     */
    getElectionYear(year) {
    }

    /**
     * Check the current state of the component and return the page content.
     */
    getContributions() {
        const { error, data } = this.state;
        if (error) {
            return (
                <Alert bsStyle="danger">
                    <h3>Internal Error.</h3>
                    <p>{`${error}`}</p>
                </Alert>
            );
        }
        return data && data.map(contribution => (
            <li key={contribution.transaction_id}>
                {contribution.donor_name}{' $'}
                {contribution.transaction_amount}
            </li>
        ));
    }

    componentWillMount() {
        getData('api/models/candidate_contributions/', (error, data) =>
            this.setState({ error, data }));
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
            <Grid>
                <Row>
                    <h1> Average Donation Per Win </h1>
                    <Form
                        onPressEnter={this.getElectionYear}
                        controlLabel='Candidate Election Year'
                        placeholder='Ex: 2010'
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
                            <BarChart data={data} // Horizontal Bar Chart
                                xKey={'donor'}
                                yKey={'sum'}
                                width={800}
                                height={800}
                                barColor='steelBlue'
                            />
                        </div>
                    }
                </Row>
                <Row>
                    <div className="contribution-list">
                        <p>
                            {'Below are some candidate contributions loaded '}
                            {'form the API server. Now let\'s visualize them!'}
                        </p>
                        {this.getContributions()}
                    </div>
                </Row>
            </Grid>
        );
    }
}
export default AvgDonations;
