/**
 * Search topics by substring matching (case-insensitive)
 * Searches in: title, explanation, and category
 * @param {Object} categories - Categories object with topics
 * @param {string} query - Search query
 * @returns {Object} Filtered categories object
 */
export const searchTopics = (categories, query) => {
    // If no query, return all categories
    if (!query || query.trim() === '') {
        return categories;
    }

    const searchTerm = query.toLowerCase().trim();
    const filteredCategories = {};

    // Iterate through each category
    Object.entries(categories).forEach(([categoryName, topics]) => {
        // Filter topics that match the search query
        const matchedTopics = topics.filter(topic => {
            const titleMatch = topic.title.toLowerCase().includes(searchTerm);
            const explanationMatch = topic.explanation.toLowerCase().includes(searchTerm);
            const categoryMatch = topic.category.toLowerCase().includes(searchTerm);

            return titleMatch || explanationMatch || categoryMatch;
        });

        // Only include category if it has matching topics
        if (matchedTopics.length > 0) {
            filteredCategories[categoryName] = matchedTopics;
        }
    });

    return filteredCategories;
};

/**
 * Check if search has any results
 * @param {Object} categories - Filtered categories object
 * @returns {boolean} True if there are results
 */
export const hasSearchResults = (categories) => {
    return Object.keys(categories).length > 0;
};
