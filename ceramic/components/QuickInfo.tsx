import { useState } from "react";
import styles from "../../styles/ceramic.module.css";

export default function QuickInfo({ quickInfo }) {
  return (
    <div className={styles.quickInfo}>
      <div className={styles.quickInfoCard}>
        <p>Addresses In Ceramic Store</p>
        <h3 style={{ color: "#00A72F" }}>{quickInfo?.ceramicWalletsCnt}</h3>
      </div>
      <div className={styles.quickInfoCard}>
        <p>Unlinked Addresses In Local Store</p>
        <h3 style={{ color: "#CA0000" }}>{quickInfo?.unlinkedWalletsCnt}</h3>
      </div>
    </div>
  );
}
