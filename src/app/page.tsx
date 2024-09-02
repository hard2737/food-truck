import styles from "./page.module.css";
import React from 'react'
import VendorsProvider from "./features/Vendors/VendorsProvider";

export default function Home() {

  return (
    <main className={styles.main}>
      <VendorsProvider/>
    </main>
  );
}

