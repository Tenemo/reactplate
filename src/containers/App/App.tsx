import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import 'normalize.css';

import RobotoMonoRegularWoff2 from 'fonts/RobotoMono-Regular.woff2';
import RobotoMonoRegularWoff from 'fonts/RobotoMono-Regular.woff';
import RobotoMonoRegularTtf from 'fonts/RobotoMono-Regular.ttf';
import RobotoMonoRegularSvg from 'fonts/RobotoMono-Regular.svg';

import NotFound from 'components/NotFound';
import Header from 'components/Header';
import HomePage from 'containers/HomePage';

const theme = {
    dark: { primary: `#111`, secondary: `#CCC` },
    light: { primary: `#CCC`, secondary: `#111` },
};
const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
        font-size: 16px;
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
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
    display: flex;
    flex-direction: column;
`;

export class App extends Component {
    public render(): JSX.Element {
        return (
            <ThemeProvider theme={theme.dark}>
                <AppContainer>
                    <GlobalStyle />
                    <Header />
                    <Switch>
                        <Route component={HomePage} exact path="/" />
                        <Route component={NotFound} />
                    </Switch>
                </AppContainer>
            </ThemeProvider>
        );
    }
}

export default App;
