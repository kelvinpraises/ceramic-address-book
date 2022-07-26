import { AddCircle, Delete } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import styled from '@emotion/styled';

const SCeramicTileEditable = styled.li`
  margin-bottom: 1rem;
  padding: 1rem;
  background: linear-gradient(
    179.98deg,
    #ffffff 0.02%,
    rgba(255, 255, 255, 0.5) 101.57%
  );
  backdrop-filter: blur(40px);
  border-radius: 7px;
`;

const SCeramicTileTextField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const SCeramicTileTextFieldW = styled.div`
  border-radius: 7px;
  border: 2px solid #a8a8a8;
`;

const SCeramicTileSave = styled.div`
  display: grid;
  place-items: center;
  background-color: #058d8d;
  color: #ffffff;
  border-radius: 7px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SCeramicTileDelete = styled.div`
  display: grid;
  place-items: center;
  background-color: #eb5959;
  color: #ffffff;
  border-radius: 7px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export default function CeramicBookEdit({
  contact,
  index,
  ceramicBook,
  setCeramicBook,
  getButton,
}: {
  contact: IContacts;
  index: number;
  ceramicBook: ICeramicBook;
  setCeramicBook: any;
  getButton: any;
}) {
  const [editableName, setEditableName] = useState<string>();
  const [editableAvatar, setEditableAvatar] = useState<string>();
  const [editableWallets, setEditableWallets] = useState<any[]>();
  const [editableTag, setEditableTags] = useState<string>();

  useEffect(() => {
    if (contact !== null) {
      setEditableName(contact.name);
      setEditableAvatar(contact.avatar);
      setEditableWallets([...contact.wallets]);
      setEditableTags(contact.tags?.length >= 1 ? contact.tags.join(", ") : "");
    }
  }, [contact]);

  const addWallet = useCallback(() => {
    if (editableWallets) {
      const data = editableWallets;
      data.push({ walletAddress: "", network: "" });
      setEditableWallets([...data]);
    }
  }, [editableWallets, setEditableWallets]);

  const updateWallet = useCallback(
    ({ index, id, value }: { index: number; id: string; value: any }) => {
      if (editableWallets) {
        if (id === "wallet") {
          const data = editableWallets;
          data[index].walletAddress = value;
          setEditableWallets([...data]);
        } else if (id === "network") {
          const data = editableWallets;
          data[index].network = value;
          setEditableWallets([...data]);
        }
      }
    },
    [editableWallets, setEditableWallets]
  );

  const deleteWallet = useCallback(
    (index: number) => {
      if (editableWallets) {
        const data = editableWallets;
        data.splice(index, 1);
        setEditableWallets([...data]);
      }
    },
    [editableWallets, setEditableWallets]
  );

  // Saves the contact
  const saveContact = useCallback(() => {
    const data = { ...ceramicBook };

    const contacts = [...data.contacts];
    const contact = {
      name: editableName,
      wallets: editableWallets,
      avatar: editableAvatar,
      tags:
        editableTag && editableTag.length >= 1
          ? editableTag?.split(", ")
          : [""],
      data: {},
    };

    (contacts as any).splice(index, 1, contact);

    data.contacts = contacts;
    setCeramicBook(data);
  }, [
    index,
    ceramicBook,
    setCeramicBook,
    editableName,
    editableWallets,
    editableAvatar,
    editableTag,
  ]);

  // Deletes the contact
  const deleteContact = useCallback(() => {
    const data = { ...ceramicBook };

    const contacts = [...data.contacts];
    contacts.splice(index, 1);

    data.contacts = contacts;
    setCeramicBook(data);
  }, [index, ceramicBook, setCeramicBook]);

  return (
    <SCeramicTileEditable>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginBottom: "2rem" }}></div>
        {getButton()}
      </div>

      <SCeramicTileTextField>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={editableName}
          onChange={(e) => setEditableName(e.target.value)}
        />
      </SCeramicTileTextField>

      <SCeramicTileTextField>
        <label htmlFor="avatar">Image Url</label>
        <input
          type="text"
          id="avatar"
          value={editableAvatar}
          onChange={(e) => setEditableAvatar(e.target.value)}
        />
      </SCeramicTileTextField>

      <SCeramicTileTextField>
        <label htmlFor="wallet">Wallets</label>
        <SCeramicTileTextFieldW>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 .5rem",
            }}
          >
            <p
              style={{
                width: "29ch",
              }}
            >
              Address
            </p>
            <p>Network</p>
          </div>
          {editableWallets?.map(({ walletAddress, network }, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: ".5rem",
                  borderTop: "2px solid #A8A8A8",
                }}
                key={index + "editable"}
              >
                <input
                  style={{ width: "27ch" }}
                  value={walletAddress}
                  type="text"
                  id="wallet"
                  onChange={(e) =>
                    updateWallet({
                      index,
                      id: "wallet",
                      value: e.target.value,
                    })
                  }
                />
                <input
                  style={{ width: "12ch" }}
                  value={network}
                  type="text"
                  id="network"
                  onChange={(e) =>
                    updateWallet({
                      index,
                      id: "network",
                      value: e.target.value,
                    })
                  }
                />
                <Delete onClick={() => deleteWallet(index)} />
              </div>
            );
          })}
          <div style={{ margin: ".5rem" }}>
            <AddCircle onClick={() => addWallet()} />
          </div>
        </SCeramicTileTextFieldW>
      </SCeramicTileTextField>

      <SCeramicTileTextField>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          value={editableTag}
          onChange={(e) => setEditableTags(e.target.value)}
        />
      </SCeramicTileTextField>

      <SCeramicTileSave onClick={() => saveContact()}>
        Save Edit
      </SCeramicTileSave>
      <SCeramicTileDelete onClick={() => deleteContact()}>
        Hold to Delete Address
      </SCeramicTileDelete>
    </SCeramicTileEditable>
  );
}
