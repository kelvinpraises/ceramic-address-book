import { useCallback, useEffect, useState } from "react";
import { DataModel } from "../../node_modules/@glazed/datamodel/dist/index";
import { DIDDataStore } from "../../node_modules/@glazed/did-datastore/dist/index";
import styles from "../../styles/ceramic.module.css";
import CeramicBook from "../components/CeramicBook";
import LocalBook from "../components/LocalBook";
import QuickInfo from "../components/QuickInfo";
import { ICeramicBook, IQuickInfo } from "../types";
const aliases = {
  definitions: {
    myAddressBook:
      "kjzl6cwe1jw149hy5kge1gqmp669kvn2c0xmnrr109wajqrwteg9mdmlalzaku4",
    DIDToAddressBook:
      "kjzl6cwe1jw147ff7ga8wa97ytivguq3cb2umpwkvdbuyydx7drpnaitmtvhx8r",
  },
  schemas: {
    AddressBook:
      "ceramic://k3y52l7qbv1frxycyoblevfvx12ws5t0iuqmrwiadl36p20ectvw9yuhs4g9uruv4",
    DIDToAddressBook:
      "ceramic://k3y52l7qbv1fry9pcj5rymkn9686buqtmaley7qujeyd4atyy2huvrzumsc9jc2kg",
  },
  tiles: {},
};

export default function AddressBook({ ceramic, setLoading }) {
  const [dataStore, setDataStore] = useState<any>();

  const [editing, setEditing] = useState(false);
  const [ceramicBook, _setCeramicBook] = useState<ICeramicBook | null>();
  const [unlinkedWallets, setUnlinkedWallets] = useState([]);
  const [quickInfo, setQuickInfo] = useState<IQuickInfo | null>();

  // Retrieves Ceramic Address Book Stream.
  useEffect(() => {
    if (ceramic) {
      setLoading(true);
      (async () => {
        const model = new DataModel({ ceramic, aliases });

        const dataStore = new DIDDataStore({ ceramic, model });

        setDataStore(dataStore);

        let data = await dataStore.get("myAddressBook");

        if (data) {
          _setCeramicBook(data);
        }

        setLoading(false);
      })();
    }
  }, [ceramic, setLoading, _setCeramicBook, setDataStore]);

  // Saves Changes to the Ceramic Address Book Stream
  const setCeramicBook = useCallback(
    async (data: ICeramicBook) => {
      console.log(data);
      setLoading(true);
      try {
        await dataStore.set("myAddressBook", data);
        _setCeramicBook(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("couldn't save that something went wrong");
        console.log(error);
      }
    },
    [dataStore, setLoading]
  );

  // Retrieves Local Storage Addresses not in Ceramic Address Book.
  useEffect(() => {
    if (ceramicBook !== undefined) {
      const ceramicWallets = getCeramicWallets();
      const localWallets = getLocalStorageWallets();

      // Local Storage Addresses not in Ceramic Address Book.
      const unlinkedWallets = [];

      localWallets.forEach((localWallet) => {
        const inCeramic = [];

        ceramicWallets.forEach((ceramicWallet) => {
          if (
            ceramicWallet.walletAddress === localWallet.walletAddress &&
            ceramicWallet.network === localWallet.network
          ) {
            inCeramic.push(true);
          } else {
            inCeramic.push(false);
          }
        });

        if (!inCeramic.includes(true)) {
          unlinkedWallets.push(localWallet);
        }
      });

      setUnlinkedWallets(unlinkedWallets);
    }
  }, [ceramicBook]);

  // Sets a Quick Info on the Address Books state.
  useEffect(() => {
    if (ceramicBook !== undefined && unlinkedWallets !== undefined) {
      const ceramicWallets = getCeramicWallets();

      const data = {
        ceramicWalletsCnt: ceramicWallets.length,
        unlinkedWalletsCnt: unlinkedWallets.length,
      };

      setQuickInfo(data);
    }
  }, [ceramicBook, unlinkedWallets]);

  // Retrieves an array of all wallets in a Ceramic Address Book
  const getCeramicWallets = useCallback(() => {
    const ceramicWallets = [];

    ceramicBook.contacts.forEach((contact) =>
      contact.wallets.forEach((wallet) => ceramicWallets.push(wallet))
    );

    return ceramicWallets;
  }, [ceramicBook]);

  // Retrieves the wallets stored in Local Storage
  const getLocalStorageWallets = useCallback(() => {
    const localWallets = [
      {
        walletAddress: "0xD",
        network: "ethereum",
        name: "kel",
      },
      {
        walletAddress: "0xc2j3n49",
        network: "ropsten",
        name: "andeer",
      },
      {
        walletAddress: "0xc784849",
        network: "vocados",
        name: "faith",
      },
      {
        walletAddress: "0xD]80",
        network: "ethereum",
        name: "ajah",
      },
    ];

    return localWallets;
  }, []);

  // Create a loading state!

  return (
    <div className={styles.container}>
      <QuickInfo quickInfo={quickInfo} />

      <CeramicBook
        editing={editing}
        setEditing={setEditing}
        ceramicBook={ceramicBook}
        setCeramicBook={setCeramicBook}
      />

      <LocalBook
        editing={editing}
        setEditing={setEditing}
        unlinkedWallets={unlinkedWallets}
        ceramicBook={ceramicBook}
        setCeramicBook={setCeramicBook}
      />
    </div>
  );
}
