import {ethers, HDNodeWallet} from "ethers";

export const generateKeys = (seedPhrase?: string) => {
    let wallet: HDNodeWallet;

    if(seedPhrase){
        wallet = ethers.Wallet.fromPhrase(seedPhrase)
    } else {
        wallet = ethers.Wallet.createRandom();
        seedPhrase = wallet.mnemonic?.phrase;
    }

    const privateKey = wallet.privateKey
    const address = wallet.address

    console.log({seedPhrase, privateKey, address})

    return {seedPhrase, privateKey, address}
};