import React, {useEffect, useState} from "react";
import {Account} from "../../models/Account";
import {ethers} from "ethers";
import {goerli} from "../../models/Chain.ts";
import {toFixedIfNecessary} from "../../utils/AccountUtils.ts";

interface AccountDetailProps {
    account: Account
}

const AccountDetails: React.FC<AccountDetailProps> = ({account}) => {
    const [balance, setBalance] = useState(account.balance);

    useEffect(() => {
        const fetchData = async () => {
            const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
            const accountBalance = await provider.getBalance(account.address);
            setBalance(String(toFixedIfNecessary(ethers.utils.formatEther(accountBalance))));
        }
        fetchData();
    }, [account.address])

    return (
        <>
            <h4>
                Address: <a href={`https://goerli.etherscan.io/address/${account.address}`} target="_blank"
                            rel="noreferrer">
                {account.address}
            </a> <br/>
                Balance: {balance} ETH
            </h4>
        </>
    )
}

export default AccountDetails;