import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'vendor.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { hot } from 'react-hot-loader/root';

import NotFound from 'components/NotFound';
import Header from 'components/Header';
import HomePage from 'containers/HomePage';

import RobotoMonoRegularWoff2 from 'fonts/RobotoMono-Regular.woff2';
import RobotoMonoRegularWoff from 'fonts/RobotoMono-Regular.woff';
import RobotoMonoRegularTtf from 'fonts/RobotoMono-Regular.ttf';
import RobotoMonoRegularSvg from 'fonts/RobotoMono-Regular.svg';

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
`;

const AppContainer = styled.div`
    @font-face {
        font-family: 'Roboto Mono';
        src: url(${RobotoMonoRegularWoff2}) format('woff2'),
            url(${RobotoMonoRegularWoff}) format('woff'),
            url(${RobotoMonoRegularTtf}) format('truetype'),
            url(${RobotoMonoRegularSvg}) format('svg');
    }
    font-family: 'Roboto Mono', 'Courier New', 'Courier', monospace;
    height: 100%;
    padding: 10px 15px;
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
