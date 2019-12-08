import React, { Component } from 'react';
import styled from 'styled-components';

const HomePageContainer = styled.div`
    background-color: ${(props): string => props.theme.primary};
    flex: 1;
    overflow-y: auto;
    display: flex;
    align-items: flex-start;
    .large-container {
        border: 2px solid ghostwhite;
        background: #111;
        padding: 5px;
        margin: 5px;
        width: 100%;
        height: 400px;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: flex-end;
    }
`;
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { name: `Piotr` };
        this.logStuff = this.logStuff.bind(this);
    }

    logStuff() {
        console.log(this.state.name);
    }

    render() {
        return (
            <HomePageContainer>
                <div className="large-container">
                    <div className="dropdown">
                        <select>
                            <option>Option # 1</option>
                            <option>Option # 2</option>
                            <option>Option # 3</option>
                            <option>Option # 4</option>
                            <option>Option # 5</option>
                            <option>Option # 6</option>
                            <option>Option # 7</option>
                            <option>Option # 8</option>
                        </select>
                    </div>
                </div>
            </HomePageContainer>
        );
    }
}

export default HomePage;
