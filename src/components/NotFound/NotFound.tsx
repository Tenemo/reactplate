import React, { ReactElement } from 'react';

const NotFound = (): ReactElement => (
    <div>
        Path <strong>{window.location.pathname}</strong> not found.
    </div>
);

export default NotFound;
