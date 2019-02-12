import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import 'normalize.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeProvider } from 'styled-components';
// import NotFound from 'components/NotFound'

const theme = {
    main: 'black',
};

export class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <div>Reactplate</div>
                    <p>Reactplate</p>
                </React.Fragment>
            </ThemeProvider>
        );
    }
}

export default App;
