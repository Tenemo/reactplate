// Importing necessary functions from RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type ExampleArticle = {
    id: number;
    title: string;
    url: string;
};

type ExampleApiResponse = {
    results: ExampleArticle[];
};

export const exampleRequestApi = createApi({
    reducerPath: 'exampleRequestApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spaceflightnewsapi.net/v4/',
    }),
    endpoints: (build) => ({
        getExamplePage: build.query<ExampleApiResponse, void>({
            query: () => `articles?limit=10`,
        }),
    }),
});

export const { useGetExamplePageQuery } = exampleRequestApi;
