import styled from "@emotion/styled";
import { image } from "../constants";
import logo from "./ceramic.svg";

const SInitConnect = styled.div`
  display: flex;
  width: 1000px;
  height: 80vh;
  background-image: url(${image});
  background-size: 1000px;
  background-repeat: repeat-y;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SH3 = styled.div`
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%), #000000;
  border-radius: 7px;
  color: #ffffff;
  padding: 1rem 1.2rem;
  width: fit-content;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background: linear-gradient(180deg, #575a6f 0%, #232429 100%);
  }
`;

const SH4 = styled.div`
  color: #3e404b;
`;

export default function InitConnect({
  init,
  setLoading,
}: {
  init: Function;
  setLoading: Function;
}) {
  return (
    <SInitConnect>
      <img src={logo} style={{ height: 350 }} alt="ceramic dashboard logo" />
      <SButtonGroup>
        <SH3
          onClick={() => {
            init();
            setLoading(true);
          }}
        >
          Connect Wallet
        </SH3>
        <SH4>Connect to access your ceramic address book</SH4>
      </SButtonGroup>
    </SInitConnect>
  );
}
