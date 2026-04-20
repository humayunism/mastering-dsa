import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import styles from './Layout.module.css';

interface Chapter {
  slug: string;
  title: string;
  path: string;
  number: string;
}

interface LayoutProps {
  children: React.ReactNode;
  chapters: Chapter[];
  currentChapter?: string;
}

export default function Layout({ children, chapters, currentChapter }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check for saved theme preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const filteredChapters = chapters.filter((ch) =>
    ch.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button
            className={styles.menuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className={styles.logo}>
            <h1>📚 Mastering DSA</h1>
          </Link>

          <div className={styles.headerControls}>
            <button
              className={styles.themeToggle}
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search chapters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <nav className={styles.nav}>
            {filteredChapters.map((chapter) => (
              <Link
                key={chapter.slug}
                href={chapter.path}
                className={`${styles.navItem} ${
                  currentChapter === chapter.slug ? styles.active : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={styles.navNumber}>{chapter.number}</span>
                <span className={styles.navTitle}>{chapter.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.mainContent}>{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
