import React, {useCallback, useEffect, useState} from "react";
import {Account} from "../../../models/Account.ts";
import {ethers} from "ethers";
import {StyledButton} from "../../presentational/Form.tsx";
import {goerli} from "../../../models/Chain.ts";
import {shortenAddress} from "../../../utils/AccountUtils.ts";
import {Transaction} from "../../../models/Transaction.ts";
import {TransactionService} from "../../../services/TransactionService.ts";
import {StyledTable, StyledTbody, StyledTd, StyledTh, StyledThead, StyledTr} from "../../presentational/Table.tsx";

type AccountTransactionsProps = {
    account: Account,
};


const AccountTransactions: React.FC<AccountTransactionsProps> = ({account}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [networkResponse, setNetworkResponse] = useState<{
        status: null | 'pending' | 'complete' | 'error',
        message: string | React.ReactElement
    }>({
        status: null,
        message: '',
    });

    const getTransactions = useCallback(
        () => {
            setNetworkResponse({
                status: 'pending',
                message: '',
            });
            TransactionService.getTransactions(account.address).then(response => {
                setTransactions(response.data.result);
            }).catch(error => {
                console.log({error})
                setNetworkResponse({
                    status: 'error',
                    message: JSON.stringify(error),
                });
            }).finally(() => {
                setNetworkResponse({
                    status: 'complete',
                    message: '',
                });
            });
        }, [account.address]
    );

    useEffect(() => {
        getTransactions()
    }, [getTransactions])

    return (
        <div>

            <h2>Transactions</h2>
            <div>
                {networkResponse.status === "complete" && transactions.length === 0 && (
                    <p>No transactions found for this address</p>
                )}
                <StyledButton style={{marginBottom: '10px'}} type="button" onClick={getTransactions}
                              disabled={networkResponse.status === "pending"}>
                    Refresh Transactions
                </StyledButton>
                {/* Show the network response status and message */}
                {networkResponse.status && (
                    <>
                        {networkResponse.status === "pending" && (
                            <p className="text-info">Loading transactions...</p>
                        )}
                        {networkResponse.status === "error" && (
                            <p className="text-danger">
                                Error occurred while transferring tokens: {networkResponse.message}
                            </p>
                        )}
                    </>
                )}
            </div>
            <StyledTable>
                <StyledThead>
                    <StyledTr>
                        <StyledTh>Hash</StyledTh>
                        <StyledTh>From</StyledTh>
                        <StyledTh>To</StyledTh>
                        <StyledTh>Value</StyledTh>
                        <StyledTh>Timestamp</StyledTh>
                    </StyledTr>
                </StyledThead>
                <StyledTbody>
                    {transactions.map(transaction => (
                        <StyledTr key={transaction.hash}>
                            <StyledTd>
                                <a
                                    href={`${goerli.blockExploreUrl}/tx/${transaction.hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {shortenAddress(transaction.hash)}
                                </a>
                            </StyledTd>
                            <StyledTd>
                                <a
                                    href={`${goerli.blockExploreUrl}/address/${transaction.from_address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {shortenAddress(transaction.from_address)}
                                </a>
                                &nbsp;
                                {transaction.from_address.toLowerCase() === account.address.toLowerCase() ?
                                    <span style={{
                                        backgroundColor: "#FFDF00",
                                        borderRadius: "5px",
                                        padding: "2px"
                                    }}>OUT</span>
                                    :
                                    <span style={{
                                        backgroundColor: "green",
                                        borderRadius: "5px",
                                        padding: "2px"
                                    }}>IN</span>
                                }
                            </StyledTd>
                            <StyledTd>
                                <a
                                    href={`${goerli.blockExploreUrl}/address/${transaction.to_address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {shortenAddress(transaction.to_address)}
                                </a>
                            </StyledTd>
                            <StyledTd>
                                {ethers.utils.formatEther(transaction.value)} ETH
                            </StyledTd>
                            <StyledTd>
                                {new Date(transaction.block_timestamp).toLocaleString()}
                            </StyledTd>
                        </StyledTr>
                    ))}
                </StyledTbody>
            </StyledTable>
        </div>
    )
}

export default AccountTransactions;