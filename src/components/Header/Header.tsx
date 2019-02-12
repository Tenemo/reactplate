import React, { Component } from 'react';

export default class Header extends Component {
    constructor() {
        super();
        this.state = { counter: 0 };
    }

    render() {
        return (
            <div>
                {this.state.counter}{' '}
                <button
                    style={{ color: 'black' }}
                    onClick={() => {
                        this.setState({ counter: this.state.counter + 1 });
                    }}
                >
                    ADD ONE
                </button>
            </div>
        );
    }
}
