import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';

describe(`HomePage`, (): void => {
    it('has heading with the right value', () => {
        render(<HomePage />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('HomePage');
    });
});
