import React from 'react';

const NotFound = ({ match }) => {
    return <div>Path "{match.params[0]}" not found.</div>;
};

export default NotFound;
