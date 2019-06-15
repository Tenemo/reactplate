import React from 'react';
import { render } from 'react-dom';
import Root from './Root';

render(<Root />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./Root', (): void => render(<Root />, document.getElementById('root')));
}
