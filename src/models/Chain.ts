export type Chain = {
    chainId: string;
    name: string;
    blockExploreUrl: string;
    rpcUrl: string;
};

export const goerli: Chain = {
    chainId: '5',
    name: 'Goerli',
    blockExploreUrl: 'https://goerli.etherscan.io',
    rpcUrl: process.env.GOERLI_RPC_URL,
};

export const mainnet: Chain = {
    chainId: '1',
    name: 'Ethereum',
    blockExploreUrl: 'https://etherscan.io',
    rpcUrl: process.env.MAINETT_RPC_URL,
};

export const CHAINS_CONFIG = {
    [goerli.chainId]: goerli,
    [mainnet.chainId]: mainnet
}