import React, { Fragment, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { hot } from 'react-hot-loader/root';

import NotFound from 'components/NotFound';
import Header from 'components/Header';
import HomePage from 'containers/HomePage';

const theme = {
    primary: '#222',
    secondary: '#CCC',
};
const GlobalStyle = createGlobalStyle`
    html,
    body,
    #app {
    height: 100%;
    }
    * {
        box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }
`;
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
                    <GlobalStyle />
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
