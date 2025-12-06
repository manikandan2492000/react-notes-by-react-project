import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { allTopics } from '../../../data';
import CodeBlock from '../../common/CodeBlock/CodeBlock';
import Card from '../../common/Card/Card';
import styles from './TopicDetail.module.scss';
import { BookOpen, Code, Lightbulb, HelpCircle } from 'lucide-react';
import { renderTextWithBold } from '../../../utils/textFormatter.jsx';

const TopicDetail = () => {
    const { topicId } = useParams();

    const topic = useMemo(() =>
        allTopics.find(t => t.id === topicId),
        [topicId]
    );

    if (!topic) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span className={styles.category}>{topic.category}</span>
                <h1 className={styles.title}>{topic.title}</h1>
            </header>

            <div className={styles.grid}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <BookOpen size={20} /> Explanation
                    </h2>
                    <Card className={styles.contentCard}>
                        <div className={styles.markdown}>
                            {/* Simple markdown rendering with bold support */}
                            {topic.explanation.split('\n').map((line, i) => {
                                if (line.startsWith('###')) return <h3 key={i}>{renderTextWithBold(line.replace('###', ''))}</h3>;
                                if (line.startsWith('-')) return <li key={i}>{renderTextWithBold(line.replace('-', ''))}</li>;
                                if (line.trim() === '') return <br key={i} />;
                                return <p key={i}>{renderTextWithBold(line)}</p>;
                            })}
                        </div>
                    </Card>
                </section>

                {topic.analogy && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <Lightbulb size={20} /> Analogy
                        </h2>
                        <Card className={styles.analogyCard}>
                            <p>{renderTextWithBold(topic.analogy)}</p>
                        </Card>
                    </section>
                )}

                {topic.code && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <Code size={20} /> Example
                        </h2>
                        <CodeBlock code={topic.code} />
                    </section>
                )}

                {topic.interviewQuestions && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            <HelpCircle size={20} /> Interview Questions
                        </h2>
                        <div className={styles.questions}>
                            {topic.interviewQuestions.map((q, index) => (
                                <Card key={index} className={styles.questionCard}>
                                    <h3 className={styles.question}>Q: {renderTextWithBold(q.question)}</h3>
                                    <p className={styles.answer}>A: {renderTextWithBold(q.answer)}</p>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default TopicDetail;
