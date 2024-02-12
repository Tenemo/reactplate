import { screen } from '@testing-library/react';
import React from 'react';

import HomePage from './HomePage';

import { renderWithProviders } from 'utils/test-utils';

jest.mock('features/ExampleRequest/exampleRequestSlice', () => ({
    ...jest.requireActual('features/ExampleRequest/exampleRequestSlice'), // This keeps the actual implementations of other exports
    useGetExamplePageQuery: jest.fn(() => ({
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
    })),
}));

describe('HomePage', () => {
    it('displays articles when data is available', () => {
        renderWithProviders(<HomePage />);
        const articleLinks = screen
            .getAllByText(/Article/i)
            .map((link) => link.closest('a'));
        expect(articleLinks).toHaveLength(2);
        expect(articleLinks[0]).toHaveTextContent('Article 1');
        expect(articleLinks[1]).toHaveTextContent('Article 2');
    });
});
