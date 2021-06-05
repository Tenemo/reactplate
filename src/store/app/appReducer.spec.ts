import { appReducer, initialAppState } from './appReducer';
import { toggleTheme } from './appActions';
import { APP_TOGGLE_THEME } from './appTypes';

describe('appReducer', () => {
    it('should return the initial state', () => {
        expect(appReducer(undefined, { type: APP_TOGGLE_THEME })).toEqual(
            initialAppState,
        );
    });
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
