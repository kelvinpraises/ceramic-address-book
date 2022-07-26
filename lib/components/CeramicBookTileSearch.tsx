import { AddCircle } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import ellipsisAddress from "../utils/ellipsisAddress";

interface ISAccordion {
  opened: boolean;
}

const SAccordionItemInner = styled.div<ISAccordion>`
  max-height: 0;
  overflow: hidden;
  text-transform: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  transition-duration: 0.6s;
  transition-property: max-height;
  z-index: 1;
  position: relative;

  ${({ opened }) => {
    if (opened) {
      return `
      max-height: 300rem;
      height: auto;
      transition-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
      transition-duration: 0.5s;
      transition-property: max-height;  
      `;
    }
  }}
`;

const SAccordionItemContent = styled.div<ISAccordion>`
  opacity: 0;
  transform: translateY(-1rem);
  transition-timing-function: linear, ease;
  transition-duration: 0.5s;
  transition-property: opacity, transform;

  ${({ opened }) => {
    if (opened) {
      return `
      opacity: 1;
      transform: translateY(0);
      transition-timing-function: ease-in-out;
      transition-property: opacity, transform;
      `;
    }
  }}
`;

const SAccordionWallet = styled.div`
  border-radius: 7px;
  border: 2px solid #a8a8a8;
`;

const SAccordion = styled.li`
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

export default function CeramicBookTileSearch({
  contact,
  ceramicBook,
  setCeramicBook,
}: {
  contact: IContacts;
  ceramicBook: ICeramicBook;
  setCeramicBook: Function;
}) {
  const [opened, setOpened] = useState(false);

  const [name, setName] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const [wallets, setWallets] = useState<any[]>();
  const [tags, setTags] = useState<string[]>();

  // Loads data from the contact object into state.
  useEffect(() => {
    if (contact !== null) {
      setName(contact.name);
      setAvatar(contact.avatar);
      setWallets([...contact.wallets]);
      setTags(contact.tags);
    }
  }, [contact]);

  const saveToCeramicBook = useCallback(() => {
    if (ceramicBook && contact) {
      const data = { ...ceramicBook };
      (data as any).contacts.push(contact);
      setCeramicBook(data);
    }
    alert("added to your address book");
  }, [setCeramicBook, ceramicBook, contact]);

  const svgNoImg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="45"
      fill="none"
      viewBox="0 0 46 45"
    >
      <rect width="45" height="45" x=".5" fill="#D9D9D9" rx="7" />
      <path
        fill="#323232"
        fillRule="evenodd"
        d="M28.294 17.791A5.274 5.274 0 0 1 23 23.083a5.275 5.275 0 0 1-5.294-5.292A5.274 5.274 0 0 1 23 12.5a5.273 5.273 0 0 1 5.294 5.291ZM23 32.5c-4.338 0-8-.705-8-3.425 0-2.721 3.685-3.401 8-3.401 4.339 0 8 .705 8 3.425 0 2.721-3.685 3.401-8 3.401Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <SAccordion>
      <div onClick={() => setOpened(!opened)}>
        <div
          style={{
            display: "flex",
            alignItems: "start",
          }}
        >
          {avatar ? (
            <img width={100} src={avatar} alt={"image of" + name} />
          ) : (
            svgNoImg
          )}
          <div>
            <h3 style={{ margin: "0", marginLeft: "0.5rem" }}>{name}</h3>
          </div>
          <div style={{ flex: 1 }}></div>
          <AddCircle
            onClick={() => {
              saveToCeramicBook();
            }}
          />
        </div>
      </div>
      <SAccordionItemInner opened={opened}>
        <SAccordionItemContent opened={opened}>
          <div>
            <h3>Wallets</h3>
            <SAccordionWallet>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 .5rem",
                }}
              >
                <p
                  style={{
                    width: "20ch",

                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                  }}
                >
                  Address
                </p>
                <p
                  style={{
                    width: "7ch",

                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "1.1rem",
                  }}
                >
                  Network
                </p>
              </div>
              <div>
                {wallets?.map(({ walletAddress, network }, index) => {
                  return (
                    <div
                      key={walletAddress + index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: ".5rem",
                        borderTop: "2px solid #A8A8A8",
                      }}
                    >
                      <p style={{ width: "20ch", margin: 0 }}>
                        {ellipsisAddress(walletAddress)}
                      </p>
                      <p style={{ width: "14ch", margin: 0 }}>{network}</p>
                    </div>
                  );
                })}
              </div>
            </SAccordionWallet>
          </div>
          <div>
            <h3>Tags</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {tags && tags.length >= 1 ? (
                tags.map((tag, index) => (
                  <div
                    key={tag + index}
                    style={{
                      background: "#D9D9D9",
                      borderRadius: "23px",
                      padding: "0.2rem 0.5rem",
                      marginRight: "0.2rem",
                    }}
                  >
                    {tag}
                  </div>
                ))
              ) : (
                <p style={{ margin: "0px", fontSize: "10px" }}>No tags</p>
              )}
            </div>
          </div>
        </SAccordionItemContent>
      </SAccordionItemInner>
    </SAccordion>
  );
}
