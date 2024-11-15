// Importing necessary functions from RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Article = {
    id: number;
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary: string;
    publishedAt: string;
    updatedAt: string;
    featured: boolean;
    launches: {
        launch_id: string;
        provider: string;
    }[];
    events: Event[];
};

type ExampleApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Article[];
};

export const exampleRequestSlice = createApi({
    reducerPath: 'exampleRequestApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spaceflightnewsapi.net/v4/',
    }),
    endpoints: (build) => ({
        getExamplePage: build.query<ExampleApiResponse, number | void>({
            query: () => `articles?limit=10`,
        }),
    }),
});

export const { useGetExamplePageQuery } = exampleRequestSlice;
