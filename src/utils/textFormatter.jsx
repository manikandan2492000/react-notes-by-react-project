/**
 * Parses text and converts **text** to bold elements
 * @param {string} text - The text to parse
 * @returns {Array} - Array of React elements and strings
 */
export const parseBoldText = (text) => {
    if (!text) return [];

    const parts = [];
    let currentIndex = 0;
    const regex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > currentIndex) {
            parts.push(text.substring(currentIndex, match.index));
        }

        // Add the bold text
        parts.push({
            type: 'bold',
            content: match[1]
        });

        currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
        parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : [text];
};

/**
 * Renders parsed text with bold elements
 * @param {string} text - The text to render
 * @returns {JSX.Element|string} - Rendered text with bold elements
 */
export const renderTextWithBold = (text) => {
    const parts = parseBoldText(text);

    return parts.map((part, index) => {
        if (typeof part === 'object' && part.type === 'bold') {
            return <strong key={index}>{part.content}</strong>;
        }
        return part;
    });
};
