/*
  Layout grid for blog pages
*/
import styles from './Layout.module.css';

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
