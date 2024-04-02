import React from 'react';

import {
    Article,
    useGetExamplePageQuery,
} from 'features/ExampleRequest/exampleRequestSlice';

const HomePage = (): React.JSX.Element => {
    const { data, error, isLoading } = useGetExamplePageQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!data) return <div>No data found</div>;
    return (
        <main>
            <h2>
                Latest space news fetched from{' '}
                <a
                    href="https://spaceflightnewsapi.net/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    spaceflightnewsapi.net
                </a>
            </h2>
            <ul>
                {data.results.map((article: Article) => (
                    <li key={article.id}>
                        <a
                            href={article.url}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {article.title}
                        </a>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default HomePage;
