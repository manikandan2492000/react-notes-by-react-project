import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = ({ children, onClick, variant = 'primary', className, ...props }) => {
    return (
        <button
            className={clsx(styles.button, styles[variant], className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
