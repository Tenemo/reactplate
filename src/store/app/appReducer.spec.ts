import { toggleTheme } from './appActions';
import { appReducer, initialAppState } from './appReducer';

describe('appReducer', () => {
    const previousState = initialAppState;
    describe(`theme`, () => {
        it('should change on the toggle theme action', () => {
            expect(appReducer(previousState, toggleTheme())).toEqual({
                ...previousState,
                theme: 'light',
            });
        });
    });
});
