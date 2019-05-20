import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const NotFound: React.FunctionComponent<RouteComponentProps> = ({ match }): JSX.Element => {
    return <div>Path &quot;{match.params[0]}&quot; not found.</div>;
};

export default NotFound;
