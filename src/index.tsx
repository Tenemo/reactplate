import React from 'react';
import { render } from 'react-dom';
import Root from './Root';

render(<Root />, document.getElementById('app'));
declare const module: any;
if (module.hot) {
    module.hot.accept('./Root', () => render(<Root />, document.getElementById('app')));
}
