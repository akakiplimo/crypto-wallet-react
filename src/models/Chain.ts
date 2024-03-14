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
    rpcUrl: 'https://goerli.infura.io/v3/6727cafa0e054f0ab2446d9787930b9a',
};

export const mainnet: Chain = {
    chainId: '1',
    name: 'Ethereum',
    blockExploreUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/6727cafa0e054f0ab2446d9787930b9a',
};

export const CHAINS_CONFIG = {
    [goerli.chainId]: goerli,
    [mainnet.chainId]: mainnet
}