import CeramicBookTile from "./CeramicBookTile";
import CeramicBookTileSearch from "./CeramicBookTileSearch";
import styled from "@emotion/styled";

const SCeramicBook = styled.div`
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

export default function CeramicBook({
  editing,
  setEditing,
  ceramicBook,
  setCeramicBook,
  externalCeramicBook,
  fromSearch,
}: {
  editing?: boolean;
  setEditing?: any;
  ceramicBook: ICeramicBook;
  setCeramicBook: any;
  externalCeramicBook?: ICeramicBook;
  fromSearch?: boolean;
}) {
  if (fromSearch) {
    return (
      <SCeramicBook>
        <ul>
          {externalCeramicBook?.contacts.map((contact, index) => {
            return (
              <CeramicBookTileSearch
                key={index}
                contact={contact}
                ceramicBook={ceramicBook}
                setCeramicBook={setCeramicBook}
              />
            );
          })}
        </ul>
      </SCeramicBook>
    );
  }

  return (
    <SCeramicBook>
      <h3>Ceramic Address Book</h3>
      <ul>
        {ceramicBook?.contacts.map((contact, index) => {
          return (
            <CeramicBookTile
              key={index}
              editing={editing}
              setEditing={setEditing}
              contact={contact}
              index={index}
              ceramicBook={ceramicBook}
              setCeramicBook={setCeramicBook}
            />
          );
        })}
      </ul>
    </SCeramicBook>
  );
}
