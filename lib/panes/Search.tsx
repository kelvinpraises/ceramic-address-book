import { CeramicClient } from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { CheckOutlined, Search as SearchIcon } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import SearchResults from "../components/SearchResults";
import { aliases } from "../constants";
import image from "../components/search.svg";

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  margin-left: 0px;
  height: calc(80vh - 40px);
  overflow: scroll;
`;

const SSearch = styled.div`
  display: flex;
  height: calc(80vh - 40px);
  align-items: center;
  justify-content: center;
  background-image: url(${image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 350px;
  color: white;
`;

const SSearchGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 3rem;
  height: 12rem;
`;

const SSearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 7px;

  input {
    border: none;
    outline: none;
    min-width: 15em;
    font-size: 16px;
    padding: 10px 5px;
    border-radius: 7px;
    color: #000000;
    background-color: transparent;
  }
`;

export default function Search({ ceramic }: { ceramic: CeramicClient }) {
  const [did, setDid] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [_, setShowResult] = useState(false);
  const [externalCeramicBook, setExternalCeramicBook] =
    useState<ICeramicBook>();
  const [check, setCheck] = useState(false);

  const [dataStore, setDataStore] = useState<DIDDataStore>();
  const [ceramicBook, _setCeramicBook] = useState<ICeramicBook>();

  // Retrieves users Ceramic Address Book Stream.
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

  // Retrieves address book of input did
  useEffect(() => {
    (async () => {
      console.log(ceramic.did);
      setCheck(false);
      if (did?.length > 68) {
        const doc = await TileDocument.deterministic(ceramic, {
          // Did of the tile controller.
          controllers: [did],

          // Deployed model aliases definition for "myAddressBook".
          family:
            "kjzl6cwe1jw149hy5kge1gqmp669kvn2c0xmnrr109wajqrwteg9mdmlalzaku4",
        });

        if (doc.content) {
          setLoading(false);
          setCheck(true);
          setExternalCeramicBook(doc.content as ICeramicBook);
          console.log(doc.content);
          setTimeout(() => {
            setShowResult(true);
          }, 1500);
        } else {
          setLoading(false);
          alert("No address book found");
        }
      }
    })();
  }, [did, ceramic]);

  useEffect(() => {
    if (did !== "") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [did]);

  if (externalCeramicBook) {
    return (
      <SContainer>
        <SearchResults
          did={did}
          ceramicBook={ceramicBook!}
          externalCeramicBook={externalCeramicBook}
          setCeramicBook={setCeramicBook}
        />
      </SContainer>
    );
  }

  return (
    <SContainer>
      <SSearch>
        <SSearchGroup>
          <SSearchBar>
            <SearchIcon />
            <input
              placeholder="Search any ceramic did address..."
              type="text"
              value={did}
              onChange={(e) => setDid(e.target.value)}
              style={{ background: "white", margin: "0 1rem", flex: 1 }}
            />
            {loading && <CircularProgress size={24} thickness={5} />}
            {check && <CheckOutlined color="success" />}
          </SSearchBar>
          <h2>Read an Address Book Connected to a DID</h2>
        </SSearchGroup>
      </SSearch>
    </SContainer>
  );
}
