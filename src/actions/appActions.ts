import * as types from 'constants/actionTypes';
import { AppTheme } from 'store';

interface ChangeTheme {
    type: types.APP_CHANGE_THEME;
    theme: AppTheme;
}
export type AppAction = ChangeTheme;

export const changeTheme = (theme: AppTheme): ChangeTheme => ({
    type: types.APP_CHANGE_THEME,
    theme,
});
