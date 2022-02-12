/*
  Layout grid for blog pages
*/
import styles from './BlogLayout.module.css';

type Props = {
  children: React.ReactChild | React.ReactChild[]
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      { children }
    </div>
  );
};

export default Layout;
