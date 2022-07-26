import { CeramicClient } from "@ceramicnetwork/http-client";
import styled from '@emotion/styled';

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px;
  margin-left: 0px;
  height: calc(80vh - 40px);
  overflow: scroll;
`;

export default function Profile({ ceramic }: { ceramic: CeramicClient }) {
  return <SContainer>Profile</SContainer>;
}
