import { CeramicClient } from "@ceramicnetwork/http-client";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "@emotion/styled";
import CeramicBook from "../components/CeramicBook";
import LocalBook from "../components/LocalBook";
import QuickInfo from "../components/QuickInfo";
import { aliases } from "../constants";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  margin-left: 0px;
  height: calc(80vh - 40px);
  overflow: scroll;
`;

export default function AddressBook({
  ceramic,
  setLoading,
  localWallets,
}: {
  ceramic: CeramicClient;
  setLoading: Dispatch<SetStateAction<boolean>>;
  localWallets: ILocalWallet[];
}) {
  const [dataStore, setDataStore] = useState<DIDDataStore>();
  const [editing, setEditing] = useState(false);
  const [ceramicBook, _setCeramicBook] = useState<ICeramicBook>();
  const [unlinkedWallets, setUnlinkedWallets] = useState<any>();
  const [quickInfo, setQuickInfo] = useState<IQuickInfo>();

  // Retrieves an array of all wallets in a Ceramic Address Book
  const getCeramicWallets = useCallback(() => {
    const ceramicWallets: any[] = [];

    ceramicBook?.contacts.forEach((contact) =>
      contact.wallets.forEach((wallet) => ceramicWallets.push(wallet))
    );

    return ceramicWallets;
  }, [ceramicBook]);

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
      if (dataStore) {
        console.log(data);
        setLoading(true);
        try {
          const c = await dataStore.set("myAddressBook", data);
          alert(c);
          _setCeramicBook(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          alert("couldn't save that something went wrong");
          console.log(error);
        }
      }
    },
    [dataStore, setLoading]
  );

  // Retrieves Local Storage Addresses not in Ceramic Address Book.
  useEffect(() => {
    if (ceramicBook !== undefined) {
      const ceramicWallets = getCeramicWallets();

      // Local Storage Addresses not in Ceramic Address Book.
      const unlinkedWallets: {
        walletAddress: string;
        network: string;
        name: string;
      }[] = [];

      localWallets.forEach((localWallet) => {
        const inCeramic: boolean[] = [];

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
  }, [ceramicBook, getCeramicWallets, localWallets]);

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
  }, [ceramicBook, unlinkedWallets, getCeramicWallets]);

  // Retrieves the wallets stored in Local Storage
  // const addressBookEntries = useAppSelector((state: any) =>
  //   addressBookSelectors.selectAll(state)
  // );
  // const getLocalStorageWallets = useCallback(() => {
  //   const localWallets = addressBookEntries?.map((entry) => {
  //     const network = networksByChainId.get(entry.chainId)?.slugName!;
  //     const walletAddress = entry.address;
  //     const name = entry.nameTag;
  //     return { walletAddress, network, name };
  //   });
  //   return localWallets;
  // }, []);

  return (
    <SContainer>
      <QuickInfo quickInfo={quickInfo!} />

      <CeramicBook
        editing={editing}
        setEditing={setEditing}
        ceramicBook={ceramicBook!}
        setCeramicBook={setCeramicBook}
      />

      <LocalBook
        editing={editing}
        setEditing={setEditing}
        unlinkedWallets={unlinkedWallets}
        ceramicBook={ceramicBook!}
        setCeramicBook={setCeramicBook}
      />
    </SContainer>
  );
}
