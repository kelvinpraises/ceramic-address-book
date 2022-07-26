import styled from '@emotion/styled';

const SQuickInfo = styled.div`
  display: flex;
`;

const SQuickInfoCard = styled.div`
  padding: 5px 12px;
  margin-right: 1rem;
  background: linear-gradient(
    179.98deg,
    #ffffff 0.02%,
    rgba(255, 255, 255, 0.6) 101.57%
  );
  backdrop-filter: blur(40px);
  border-radius: 7px;

  p {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 6px;
  }

  h3 {
    font-style: normal;
    font-size: 20px;
    line-height: 5px;
  }
`;

export default function QuickInfo({ quickInfo }: { quickInfo: IQuickInfo }) {
  return (
    <div>
      <h3 style={{ margin: 0, marginBottom: ".5rem" }}>Quick Info</h3>
      <SQuickInfo>
        <SQuickInfoCard>
          <p>Addresses In Ceramic Store</p>
          <h3 style={{ color: "#00A72F" }}>{quickInfo?.ceramicWalletsCnt}</h3>
        </SQuickInfoCard>
        <SQuickInfoCard>
          <p>Unlinked Addresses In Local Store</p>
          <h3 style={{ color: "#CA0000" }}>{quickInfo?.unlinkedWalletsCnt}</h3>
        </SQuickInfoCard>
      </SQuickInfo>
    </div>
  );
}
