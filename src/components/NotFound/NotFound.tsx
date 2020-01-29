import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const NotFound: React.FunctionComponent<RouteComponentProps> = (): JSX.Element => (
    <div>
        Path <strong>{window.location.pathname}</strong> not found.
    </div>
);

export default NotFound;
