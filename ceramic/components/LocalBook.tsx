import React from "react";
import LocalBookTile from "./LocalBookTile";
import styles from "../../styles/ceramic.module.css";

export default function LocalBook({
  editing,
  setEditing,
  ceramicBook,
  setCeramicBook,
  unlinkedWallets,
}) {
  return (
    <div className={styles.localBook}>
      <h3>Local Address Book</h3>
      <ul>
        {unlinkedWallets.map((unlinkedWallet) => (
          <LocalBookTile
            editing={editing}
            setEditing={setEditing}
            ceramicBook={ceramicBook}
            setCeramicBook={setCeramicBook}
            unlinkedWallet={unlinkedWallet}
          />
        ))}
      </ul>
    </div>
  );
}
