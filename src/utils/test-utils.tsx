import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from 'app/store';
import { makeStore } from 'app/store';

type ExtendedRenderOptions = {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
} & Omit<RenderOptions, 'queries'>;

export const renderWithProviders = (
    ui: ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {},
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
) => {
    const {
        preloadedState = {},
        store = makeStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions;

    const Wrapper = ({ children }: PropsWithChildren): React.JSX.Element => (
        <Provider store={store}>{children}</Provider>
    );

    return {
        store,
        user: userEvent.setup(),
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
};
