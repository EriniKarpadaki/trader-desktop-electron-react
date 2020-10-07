import React, { ReactNode } from 'react';
import Navbar from './layout/TopNavbar';
// import Footer from './layout/Footer';
import styles from './App.css';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return (
    <div className={styles.App}>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
