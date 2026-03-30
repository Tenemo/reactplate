import React from 'react';

import styles from './homePage.module.scss';

import { useGetExamplePageQuery } from 'features/ExampleRequest/exampleRequestSlice';

const HomePage = (): React.JSX.Element => {
    const { data, error, isLoading } = useGetExamplePageQuery();
    const articles = data?.results ?? [];

    if (error) return <div>An error occurred</div>;
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
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
                <ul className={styles.linksList}>
                    {articles.map((article) => (
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
            )}
        </main>
    );
};

export default HomePage;
