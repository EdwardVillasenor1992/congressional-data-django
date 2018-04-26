import React, { Component } from 'react';
import { Row, Grid, Alert } from 'react-bootstrap/lib';

import FundingSources from './FundingSources';
import getData from '../api/getData';

/**
 * The toplevel application component to render as the root node.
 */
class App extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            data: null,
        };
        this.getContributions = this.getContributions.bind(this);
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
        return (
            <div>
                <h1>Congressional Data</h1>
                <Grid>
                    <Row>
                        <FundingSources />
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
            </div>
        );
    }
}

export default App;
