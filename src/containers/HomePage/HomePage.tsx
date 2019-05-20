import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {
    render() {
        return <div>HomePage</div>;
    }
}

const mapStateToProps = state => {};

export default connect(mapStateToProps)(HomePage);
