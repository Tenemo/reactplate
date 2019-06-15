import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'vendor.scss';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import NotFound from 'components/NotFound';
import Header from 'components/Header';
import HomePage from 'containers/HomePage';

import RobotoMonoRegularWoff2 from 'fonts/RobotoMono-Regular.woff2';
import RobotoMonoRegularWoff from 'fonts/RobotoMono-Regular.woff';
import RobotoMonoRegularTtf from 'fonts/RobotoMono-Regular.ttf';
import RobotoMonoRegularSvg from 'fonts/RobotoMono-Regular.svg';

const theme = {
    dark: { primary: '#222', secondary: '#CCC' },
    light: { primary: '#CCC', secondary: '#222' },
};
const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
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
    padding: 10px 15px;
    height: 100%;
    color: ${(props): string => props.theme.secondary};
    background-color: ${(props): string => props.theme.primary};
`;
export class App extends Component {
    public render(): JSX.Element {
        return (
            <ThemeProvider theme={theme.dark}>
                <AppContainer>
                    <GlobalStyle />
                    <Header />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route component={NotFound} />
                    </Switch>
                </AppContainer>
            </ThemeProvider>
        );
    }
}

export default App;
