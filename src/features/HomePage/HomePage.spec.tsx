import type { Middleware } from '@reduxjs/toolkit';
import { screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import HomePage from './HomePage';

import { renderWithProviders } from 'utils/test-utils';

vi.mock('features/ExampleRequest/exampleRequestSlice', () => {
    const middleware: Middleware = () => (next) => (action) => next(action);
    return {
        exampleRequestSlice: {
            reducer: (
                state = {
                    queries: {},
                    mutations: {},
                    provided: {},
                    subscriptions: {},
                    config: {},
                },
            ) => state,
            middleware: middleware,
        },
        // mock the hook in the component
        useGetExamplePageQuery: () => ({
            data: {
                results: [
                    {
                        id: 1,
                        title: 'Article 1',
                        url: 'https://example.com/article1',
                    },
                    {
                        id: 2,
                        title: 'Article 2',
                        url: 'https://example.com/article2',
                    },
                ],
            },
            error: null,
            isLoading: false,
        }),
    };
});

describe('HomePage', () => {
    it('displays articles when data is available', () => {
        renderWithProviders(<HomePage />);

        const articleElements = screen.getAllByText(/Article/i);
        const articleLinks = articleElements.map((element) =>
            element.closest('a'),
        );

        expect(articleLinks.length).toBe(2);
        expect(articleLinks[0]).not.toBeNull();
        expect(articleLinks[0]?.textContent).toContain('Article 1');
        expect(articleLinks[1]).not.toBeNull();
        expect(articleLinks[1]?.textContent).toContain('Article 2');
    });
});
