import React, { Component } from 'react';
import styled from 'styled-components';

const HomePageContainer = styled.div`
    background-color: ${(props): string => props.theme.primary};
    flex: 1;
    overflow-y: auto;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;
class HomePage extends Component {
    render() {
        return <HomePageContainer>HomePage</HomePageContainer>;
    }
}

export default HomePage;
