import styles from './ThemeToggle.module.css';
import { useTheme } from '../context/ThemeProvider';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex">
      <input
        className={styles['theme-toggle']}
        checked={theme === 'dark'}
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        type="checkbox"
        name="theme-toggle"
        id="theme-toggle"
      />
    </div>
  );
};

export default ThemeToggle;
