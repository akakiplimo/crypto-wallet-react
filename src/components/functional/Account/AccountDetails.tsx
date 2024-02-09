import React, {useEffect, useState} from "react";
import {Account} from "../../../models/Account.ts";
import {ethers} from "ethers";
import {goerli} from "../../../models/Chain.ts";
import {toFixedIfNecessary} from "../../../utils/AccountUtils.ts";
import {sendToken} from "../../../utils/TransactionUtils.ts";
import {StyledButton, StyledInput, StyledLabel} from "../../presentational/Form.tsx";
import AccountTransactions from "./AccountTransactions.tsx";

interface AccountDetailProps {
    account: Account
}

const responseStatus = {
    pending: "pending",
    complete: "complete",
    error: "error",
}

const AccountDetails: React.FC<AccountDetailProps> = ({account}) => {
    const [balance, setBalance] = useState(account.balance);
    const [amount, setAmount] = useState(0);
    const [destinationAddress, setDestinationAddress] = useState('');

    const [networkResponse, setNetworkResponse] = useState<{
        status: null | 'pending' | 'complete' | 'error',
        message: string | React.ReactElement
    }>({
        status: null,
        message: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
            const accountBalance = await provider.getBalance(account.address);
            setBalance(String(toFixedIfNecessary(ethers.utils.formatEther(accountBalance))));
        }
        fetchData();
    }, [account.address])

    function handleDestinationAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
        // set the address to the value of the input on change
        setDestinationAddress(event.target.value);
    }

    function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        // set the amount to the value of the input on change
        setAmount(Number.parseFloat(event.target.value));
    }

    async function transfer() {
        // Set the network response status to 'pending' once the function is called
        setNetworkResponse({
            status: 'pending',
            message: '',
        });

        try {
            const {receipt} = await sendToken(amount, account.address, destinationAddress, account.privateKey);

            if (receipt.status === 1) {
                // set the network status to be 'complete' and the message to the transaction hash
                setNetworkResponse({
                    status: 'complete',
                    message: <p>Transfer complete! &nbsp;
                        <a href={`${goerli.blockExploreUrl}/tx/${receipt.transactionHash}`} target="_blank"
                           rel="noreferrer">
                            View Transaction
                        </a>
                    </p>,
                });

                return receipt;
            } else {
                // Transaction failed
                console.log(`Failed to send ${receipt}`)

                // Set the network response status to `error` and the message to the receipt
                setNetworkResponse({
                    status: 'error',
                    message: JSON.stringify(receipt),
                });

                return {receipt}
            }
        } catch (error: any) {
            // error occurred while sending the transaction
            console.error({error});

            // set the network response status to error and the message also to show error
            setNetworkResponse({
                status: 'error',
                message: error.reason || JSON.stringify(error),
            });
        }
    }

    return (
        <>
            <h4>
                Address: <a href={`https://goerli.etherscan.io/address/${account.address}`} target="_blank"
                            rel="noreferrer">
                {account.address}
            </a> <br/>
                Balance: {balance} ETH
            </h4>

            <div>
                <StyledLabel>Destination Address:</StyledLabel>
                <StyledInput
                    type="text"
                    value={destinationAddress}
                    onChange={handleDestinationAddressChange}
                />
            </div>

            <div>
                <StyledLabel>Amount:</StyledLabel>
                <StyledInput
                    type="number"
                    value={amount}
                    min={0}
                    onChange={handleAmountChange}
                />
            </div>

            <StyledButton
                type="button"
                onClick={transfer}
                disabled={!amount || networkResponse.status === responseStatus.pending}
            >
                Send {amount} ETH
            </StyledButton>

            {networkResponse.status &&
                <>
                    {networkResponse.status === responseStatus.pending && <p>Transfer is pending...</p>}
                    {networkResponse.status === responseStatus.complete && <p>{networkResponse.message}</p>}
                    {networkResponse.status === responseStatus.error &&
                        <p>Error occurred while transferring tokens: {networkResponse.message}</p>}
                </>
            }

            <AccountTransactions account={account} />
        </>
    )
}

export default AccountDetails;