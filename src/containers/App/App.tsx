import React, { Fragment, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'normalize.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { ThemeProvider } from 'styled-components';
import { hot } from 'react-hot-loader/root';

import 'styles/global.scss';
import NotFound from 'components/NotFound';
import Header from 'components/Header';
import HomePage from 'containers/HomePage';

const theme = {
    primary: '#333',
    secondary: '#ccc',
};
const AppContainer = styled.div`
    height: 100%;
    padding: 10px;
    font-weight: 700;
    color: ${props => props.theme.secondary};
    background-color: ${props => props.theme.primary};
`;

export class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <AppContainer>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </AppContainer>
            </ThemeProvider>
        );
    }
}

export default hot(App);
