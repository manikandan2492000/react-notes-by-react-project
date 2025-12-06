import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchTopics, hasSearchResults } from '../../../utils/searchUtils';
import { categories } from '../../../data';
import styles from './SearchModal.module.scss';

const SearchModal = ({ isOpen, onClose, searchQuery, setSearchQuery }) => {
    const inputRef = useRef(null);
    const modalRef = useRef(null);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const filteredCategories = searchTopics(categories, searchQuery);
    const hasResults = hasSearchResults(filteredCategories);

    const handleClearSearch = () => {
        setSearchQuery('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleTopicClick = () => {
        onClose();
        setSearchQuery('');
    };

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal} ref={modalRef}>
                <div className={styles.searchBox}>
                    <Search size={20} className={styles.searchIcon} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    {searchQuery && (
                        <button
                            onClick={handleClearSearch}
                            className={styles.clearButton}
                            aria-label="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                <div className={styles.results}>
                    {!searchQuery ? (
                        <div className={styles.emptyState}>
                            <Search size={48} />
                            <p>Start typing to search topics...</p>
                        </div>
                    ) : !hasResults ? (
                        <div className={styles.noResults}>
                            <p>No topics match your search for <strong>"{searchQuery}"</strong></p>
                            <p className={styles.hint}>Try different keywords</p>
                        </div>
                    ) : (
                        <div className={styles.resultsList}>
                            {Object.entries(filteredCategories).map(([categoryName, topics]) => (
                                <div key={categoryName} className={styles.category}>
                                    <h3 className={styles.categoryTitle}>{categoryName}</h3>
                                    <div className={styles.topicsList}>
                                        {topics.map((topic) => (
                                            <Link
                                                key={topic.id}
                                                to={`/topic/${topic.id}`}
                                                className={styles.topicItem}
                                                onClick={handleTopicClick}
                                            >
                                                <div className={styles.topicTitle}>{topic.title}</div>
                                                <div className={styles.topicExcerpt}>
                                                    {topic.explanation.slice(0, 100)}...
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <span className={styles.hint}>
                        <kbd>ESC</kbd> to close
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
