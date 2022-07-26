/// <reference types="react-scripts" />

interface ICeramicBook {
  total_cnt: number;
  contacts: IContacts[];
}

interface IQuickInfo {
  ceramicWalletsCnt: number;
  unlinkedWalletsCnt: number;
}

interface IContacts {
  name: string;
  wallets: IWallet[];
  avatar: string;
  tags: string[];
  data: {};
}

interface IWallet {
  walletAddress: string;
  network: string;
}

interface ILocalWallet extends IWallet {
  name: string;
}

