import { useCallback, useEffect, useState } from "react";
import { EthereumAuthProvider } from "../node_modules/@3id/connect/dist/index";
import { ThreeIdConnect } from "../node_modules/@3id/connect/dist/threeIdConnect";
import { getResolver } from "../node_modules/@ceramicnetwork/3id-did-resolver/lib/index";
import { CeramicClient } from "../node_modules/@ceramicnetwork/http-client/lib/ceramic-http-client";
import { DID } from "../node_modules/dids/lib/did";

import styles from "../styles/ceramic.module.css";
import InitConnect from "./components/InitConnect";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import AddressBook from "./pages/AddressBook";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

const API_URL = "https://ceramic-clay.3boxlabs.com";

export default function CeramicScaffold() {
  const [activeSelection, setActiveSelection] = useState("AddressBook");
  const [ethereum, setEthereum] = useState();
  const [ethAddress, setEthAddress] = useState();
  const [ceramic, setCeramic] = useState<CeramicClient>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (ethereum && ethAddress) {
        setLoading(true);
        (async () => {
          const threeID = new ThreeIdConnect();

          // Create an EthereumAuthProvider using the Ethereum provider and requested account
          const authProvider = new EthereumAuthProvider(ethereum, ethAddress);

          // Connect the created EthereumAuthProvider to the 3ID Connect instance so it can be used to
          // generate the authentication secret
          await threeID.connect(authProvider);

          // Connect to a Ceramic node
          const ceramic = new CeramicClient(API_URL);

          const did = new DID({
            provider: threeID.getDidProvider(),
            resolver: {
              ...getResolver(ceramic),
            },
          });

          // Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
          // authentication flow using 3ID Connect and the Ethereum provider
          did
            .authenticate()
            .then(() => {
              // The Ceramic client can create and update streams using the authenticated DID
              ceramic.did = did;

              setCeramic(ceramic);

              setLoading(false);
            })
            .catch((e) => {
              setLoading(false);
              alert("sometihng went wrong please connect again");
              console.log(e);
            });
        })();
      }
    } catch (e) {
      setLoading(false);
      alert("sometihng went wrong please connect again");
      console.log(e);
    }
  }, [ethereum, ethAddress]);

  // Initializes the app with etheruem.
  const init = useCallback(() => {
    if ((window as any).ethereum) {
      setEthereum((window as any).ethereum);
      (async () => {
        try {
          const addresses = await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          setEthAddress(addresses[0]);
        } catch (e) {
          alert(e);
        }
      })();
    }
  }, []);

  // Retrieves the View Pane of the Users Active Selection.
  const getActivePane = useCallback(() => {
    let pane: JSX.Element;

    switch (activeSelection) {
      case "AddressBook":
        pane = <AddressBook setLoading={setLoading} ceramic={ceramic} />;
        break;

      case "Search":
        pane = <Search ceramic={ceramic} />;
        break;

      case "Profile":
        pane = <Profile ceramic={ceramic} />;
        break;

      case "Help":
        pane = <Help />;
        break;

      default:
        pane = <AddressBook setLoading={setLoading} ceramic={ceramic} />;
        break;
    }

    return pane;
  }, [activeSelection, ceramic, setLoading]);

  const main = useCallback(() => {
    return (
      <>
        <Nav
          activeSelection={activeSelection}
          setActiveSelection={setActiveSelection}
        />

        {getActivePane()}
      </>
    );
  }, [getActivePane]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000ba",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div className={styles.scaffoldContainer}>
        {loading && <Loading />}
        {ceramic ? main() : <InitConnect init={init} setLoading={setLoading} />}
      </div>
    </div>
  );
}
