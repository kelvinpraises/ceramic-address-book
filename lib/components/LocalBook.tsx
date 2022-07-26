import styled from '@emotion/styled';
import LocalBookTile from "./LocalBookTile";

const SLocalBook = styled.div`
  ul {
    padding-inline-start: 0px;
    list-style: none;
  }

  h3 {
    font-style: normal;
    font-size: 20px;
    line-height: 5px;
  }
`;

export default function LocalBook({
  editing,
  setEditing,
  ceramicBook,
  setCeramicBook,
  unlinkedWallets,
}: {
  editing: boolean;
  setEditing: Function;
  ceramicBook: ICeramicBook;
  setCeramicBook: Function;
  unlinkedWallets: any[];
}) {
  return (
    <SLocalBook>
      <h3>Local Address Book</h3>
      <ul>
        {unlinkedWallets &&
          unlinkedWallets.map((unlinkedWallet, index) => (
            <LocalBookTile
              key={unlinkedWallet + index}
              editing={editing}
              setEditing={setEditing}
              ceramicBook={ceramicBook}
              setCeramicBook={setCeramicBook}
              unlinkedWallet={unlinkedWallet}
            />
          ))}
      </ul>
    </SLocalBook>
  );
}
