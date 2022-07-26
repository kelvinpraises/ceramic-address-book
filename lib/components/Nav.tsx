import { AccountCircle, Book, Help, Search } from "@mui/icons-material";
import styled from "@emotion/styled";

interface ISNav {
  selected: boolean;
}

const SNavContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80px;
  height: calc(80vh - 40px);
  border-radius: 7px;
  background: linear-gradient(
    179.98deg,
    #ffffff 0.02%,
    rgba(255, 255, 255, 0.5) 101.57%
  );
  backdrop-filter: blur(40px);
  margin: 20px;
`;

const SNavList = styled.ul`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-inline-start: 0px;
`;

const SNav = styled.div<ISNav>`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 100%;

  ${({ selected }) => selected && "background: #d9d9d9;"}
`;

export default function Nav({
  activeSelection,
  setActiveSelection,
}: {
  activeSelection: any;
  setActiveSelection: any;
}) {
  return (
    <SNavContainer>
      <SNavList>
        <SNav
          selected={activeSelection === "AddressBook"}
          onClick={() => setActiveSelection("AddressBook")}
        >
          <Book />
        </SNav>
        <SNav
          selected={activeSelection === "Search"}
          onClick={() => setActiveSelection("Search")}
        >
          <Search />
        </SNav>
        <SNav
          selected={activeSelection === "Profile"}
          onClick={() => setActiveSelection("Profile")}
        >
          <AccountCircle />
        </SNav>
        <li style={{ flex: 1 }}></li>
        <SNav
          selected={activeSelection === "Help"}
          onClick={() => setActiveSelection("Help")}
        >
          <Help />
        </SNav>
      </SNavList>
    </SNavContainer>
  );
}
