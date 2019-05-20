import { ApplicationStore } from 'store';

export const getList = (state: ApplicationStore): string[] => state.list;

export default getList;
