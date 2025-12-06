import React from 'react';
import styles from './Card.module.scss';
import clsx from 'clsx';

const Card = ({ children, className, onClick }) => {
    return (
        <div className={clsx(styles.card, className)} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
