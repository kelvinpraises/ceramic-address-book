import { AddCircle } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import styled from '@emotion/styled';

const SLocalBookTile = styled.div`
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  border-radius: 7px;
  color: white;
`;

export default function LocalBookTile({
  editing,
  setEditing,
  ceramicBook,
  setCeramicBook,
  unlinkedWallet,
}: {
  editing: boolean;
  setEditing: Function;
  ceramicBook: ICeramicBook;
  setCeramicBook: Function;
  unlinkedWallet: any;
}) {
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [network, setNetwork] = useState<string>();

  // Loads data from the unlinked wallet object into state.
  useEffect(() => {
    if (unlinkedWallet !== null) {
      setName(unlinkedWallet.name);
      setAddress(unlinkedWallet.walletAddress);
      setNetwork(unlinkedWallet.network);
    }
  }, [unlinkedWallet]);

  const saveToCeramicBook = useCallback(() => {
    if (ceramicBook && name && address && network) {
      setEditing(true);
      const data = { ...ceramicBook };
      (data as any).contacts.push({
        name,
        wallets: [{ walletAddress: address, network }],
        avatar: "",
      });
      setEditing(false);
      setCeramicBook(data);
    }
  }, [ceramicBook, name, address, network, setCeramicBook, setEditing]);

  return (
    <SLocalBookTile>
      <div>
        <p style={{ margin: 0, fontSize: "1.5rem", marginBottom: ".5rem" }}>
          {name}
        </p>
        <p style={{ margin: 0 }}>{address}</p>
      </div>

      <AddCircle onClick={() => saveToCeramicBook()} />
    </SLocalBookTile>
  );
}
