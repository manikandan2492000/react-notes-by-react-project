import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../../../data';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import styles from './Sidebar.module.scss';
import clsx from 'clsx';

const Sidebar = ({ isOpen, onClose }) => {
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <>
            <aside className={clsx(styles.sidebar, { [styles.open]: isOpen })}>
                <div className={styles.header}>
                    <h2>Topics</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.content}>
                    {Object.entries(categories).map(([category, topics]) => (
                        <div key={category} className={styles.category}>
                            <div
                                className={styles.categoryHeader}
                                onClick={() => toggleCategory(category)}
                            >
                                <h3>{category}</h3>
                                {expandedCategories[category] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            </div>
                            {expandedCategories[category] && (
                                <ul>
                                    {topics.map((topic) => (
                                        <li key={topic.id}>
                                            <NavLink
                                                to={`/topic/${topic.id}`}
                                                className={({ isActive }) =>
                                                    clsx(styles.link, { [styles.active]: isActive })
                                                }
                                                onClick={onClose}
                                            >
                                                {topic.title}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </aside>
            {isOpen && <div className={styles.overlay} onClick={onClose} />}
        </>
    );
};

export default Sidebar;
