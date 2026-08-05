import React from 'react';
import { useLocation } from 'react-router';

const NotFound = (): React.JSX.Element => {
    const { pathname } = useLocation();

    return (
        <div>
            Path <strong>{pathname}</strong> not found.
        </div>
    );
};

export default NotFound;
