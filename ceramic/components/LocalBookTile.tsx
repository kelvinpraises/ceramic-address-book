import React, { useCallback, useEffect, useState } from "react";
import { AddCircle } from "../../node_modules/@mui/icons-material/index";
import styles from "../../styles/ceramic.module.css";

export default function LocalBookTile({
  editing,
  setEditing,
  ceramicBook,
  setCeramicBook,
  unlinkedWallet,
}) {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [network, setNetwork] = useState();

  // Loads data from the unlinked wallet object into state.
  useEffect(() => {
    if (unlinkedWallet !== null) {
      setName(unlinkedWallet.name);
      setAddress(unlinkedWallet.walletAddress);
      setNetwork(unlinkedWallet.network);
    }
  }, [unlinkedWallet]);

  const saveToCeramicBook = useCallback(() => {
    if (ceramicBook !== null) {
      setEditing(true);
      const data = { ...ceramicBook };
      data.contacts.push({
        name,
        wallets: [{ walletAddress: address, network }],
      });
      setEditing(false);
      setCeramicBook(data);
    }
  }, [ceramicBook, name, address, network]);

  return (
    <li className={styles.localBookTile}>
      <div>
        <p style={{ margin: 0, fontSize: "1.5rem", marginBottom: ".5rem" }}>
          {name}
        </p>
        <p style={{ margin: 0 }}>{address}</p>
      </div>

      <AddCircle onClick={() => saveToCeramicBook()} />
    </li>
  );
}
