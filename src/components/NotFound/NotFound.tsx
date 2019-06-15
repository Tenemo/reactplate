import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const NotFound: React.FunctionComponent<RouteComponentProps> = (): JSX.Element => (
    <div>Path &quot;{window.location.href}&quot; not found.</div>
);

export default NotFound;
