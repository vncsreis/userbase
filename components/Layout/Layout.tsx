import Footer from '../Footer';
import Header from '../Header';
import Nav from '../Nav';
import styles from './Layout.module.css';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.sectionContent}>
        <Nav />
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
