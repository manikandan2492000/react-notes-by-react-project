import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { categories } from '../../../data';
import { searchTopics, hasSearchResults } from '../../../utils/searchUtils';
import Card from '../../common/Card/Card';
import styles from './TopicList.module.scss';
import { ArrowRight } from 'lucide-react';

const TopicList = () => {
    const { searchQuery } = useOutletContext() || { searchQuery: '' };

    // Filter topics based on search query
    const filteredCategories = searchTopics(categories, searchQuery);
    const hasResults = hasSearchResults(filteredCategories);

    return (
        <div className={styles.container}>
            <header className={styles.hero}>
                <h1>Master React for MAANG</h1>
                <p>Comprehensive notes, analogies, and interview questions.</p>
                {searchQuery && (
                    <p className={styles.searchInfo}>
                        {hasResults
                            ? `Showing results for "${searchQuery}"`
                            : `No topics match your search for "${searchQuery}"`
                        }
                    </p>
                )}
            </header>

            {!hasResults && searchQuery ? (
                <div className={styles.noResults}>
                    <h2>No topics available</h2>
                    <p>Try searching with different keywords or browse all topics by clearing your search.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {Object.entries(filteredCategories).map(([category, topics]) => (
                        <div key={category} className={styles.categorySection}>
                            <h2>{category}</h2>
                            <div className={styles.cardGrid}>
                                {topics.map((topic) => (
                                    <Link key={topic.id} to={`/topic/${topic.id}`}>
                                        <Card className={styles.topicCard}>
                                            <h3>{topic.title}</h3>
                                            <p>{topic.explanation.slice(0, 100)}...</p>
                                            <div className={styles.footer}>
                                                <span>Read more</span>
                                                <ArrowRight size={16} />
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div >
    );
};

export default TopicList;
