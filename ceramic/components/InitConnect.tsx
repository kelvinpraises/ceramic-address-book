import React from "react";
import styles from "../../styles/ceramic.module.css";

export default function InitConnect({ init, setLoading }) {
  return (
    <div className={styles.initConnect}>
      <img src="Ceramic.svg" style={{ height: 350 }} alt="website logo" />
      <div className={styles.initConnectButtonGroup}>
        <h3
          onClick={() => {
            init();
            setLoading(true);
          }}
        >
          Connect Wallet
        </h3>
        <h4>Connect to access your ceramic address book</h4>
      </div>
    </div>
  );
}
