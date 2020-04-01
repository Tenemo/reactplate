import React, { useState, useRef } from 'react';
import styled from 'styled-components';

/* eslint-disable */
const HomePageContainer = styled.div`
    background-color: ${(props): string => props.theme.primary};
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-top: 200px;
    width: 100;
    .buttonContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    button {
        width: 150px;
        flex-grow: 0;
    }
    .carouselContainer {
        border: 4px solid gray;
        padding: 20px;
        margin: 20px 0;
        flex: 1;
        width: 100%;
        text-align: center;
    }
`;
const MAX_INDEX = 5;
const HomePage = () => {
    const [index, setIndex] = useState(0);
    const onNavClick = ({ target: { name } }) => {
        if (name === `prev`) {
            setIndex(index - 1);
        } else {
            setIndex(index + 1);
        }
    };

    return (
        <HomePageContainer>
            <div className="buttonContainer">
                <button
                    name="prev"
                    onClick={onNavClick}
                    disabled={index === 0}
                    type="button"
                >
                    Previous
                </button>
                <button
                    name="next"
                    onClick={onNavClick}
                    disabled={index === MAX_INDEX}
                    type="button"
                >
                    Next
                </button>
            </div>
            <div className="carouselContainer">{index}</div>
        </HomePageContainer>
    );
};

export default HomePage;
