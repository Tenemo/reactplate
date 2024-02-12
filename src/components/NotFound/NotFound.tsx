import React from 'react';

const NotFound = (): React.JSX.Element => (
    <div>
        Path <strong>{window.location.pathname}</strong> not found.
    </div>
);

export default NotFound;
