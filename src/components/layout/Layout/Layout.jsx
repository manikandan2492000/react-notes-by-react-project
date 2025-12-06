import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import SearchModal from '../../features/SearchModal/SearchModal';
import styles from './Layout.module.scss';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle Ctrl+K keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearchClose = () => {
        setIsSearchOpen(false);
    };

    return (
        <div className={styles.layout}>
            <Navbar
                onMenuClick={() => setIsSidebarOpen(true)}
                onSearchClick={() => setIsSearchOpen(true)}
            />
            <div className={styles.container}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <main className={styles.main}>
                    <Outlet context={{ searchQuery }} />
                </main>
            </div>
            <SearchModal
                isOpen={isSearchOpen}
                onClose={handleSearchClose}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        </div>
    );
};

export default Layout;
