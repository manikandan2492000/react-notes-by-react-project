import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import styles from './CodeBlock.module.scss';

const CodeBlock = ({ code, language = 'javascript' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.codeBlock}>
            <div className={styles.header}>
                <span className={styles.language}>{language}</span>
                <button className={styles.copyButton} onClick={handleCopy}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{ margin: 0, borderRadius: '0 0 8px 8px' }}
            >
                {code.trim()}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
