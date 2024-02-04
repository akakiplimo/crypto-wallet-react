import * as React from "react";
import {generateAccount} from "../../utils/AccountUtils.ts";
import AccountDetails from "./AccountDetails.tsx";
import {useCallback, useEffect, useState} from "react";
import {Account} from "../../models/Account.ts";

const recoveryPhraseKeyName = 'recoveryPhrase';

const AccountCreate: React.FC = () => {
    const [showRecoverInput, setShowRecoverInput] = React.useState(false);
    const [seedPhrase, setSeedPhrase] = React.useState('');
    const [account, setAccount] = useState<Account | null>(null)

    const recoverAccount = useCallback(
        // recoverAccount could be used without recoveryPhrase as an argument, but then we would have to
        // put it in a deps array.
        async (recoveryPhrase: string) => {

            // Call the generateAccount function with no arguments
            // Call the generateAccount function and pass it 0 and the current seedphrase
            const result = await generateAccount(recoveryPhrase);

            // Update the account state with the newly recovered account
            setAccount(result.account);

            if (localStorage.getItem(recoveryPhraseKeyName) !== recoveryPhrase) {
                localStorage.setItem(recoveryPhraseKeyName, recoveryPhrase);
            }

        }, []
    );

    const handleSeedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeedPhrase(event.target.value);
    };

    async function createAccount() {
        // Call the generateAccount function with no arguments
        const result = await generateAccount();

        // Update the account state with the newly created account
        setAccount(result.account);
        console.log('acc: ', result.account)
    }

    useEffect(() => {

        const localStorageRecoveryPhrase = localStorage.getItem(recoveryPhraseKeyName)
        if (localStorageRecoveryPhrase) {
            setSeedPhrase(localStorageRecoveryPhrase);
            recoverAccount(localStorageRecoveryPhrase).then(r => console.log(r));
        }
    }, [recoverAccount])

    return (
        <>
            <h1>
                Zapp Wallet
            </h1>
            <div>
                <form onSubmit={event => event.preventDefault()}>
                    <button onClick={createAccount}>Create Account</button>
                    &nbsp;&nbsp;
                    <button
                        onClick={() => showRecoverInput ? recoverAccount(seedPhrase) : setShowRecoverInput(true)}
                        disabled={showRecoverInput && !seedPhrase}
                    >
                        Recover Account
                    </button>
                    {showRecoverInput && (
                        <div>
                            <hr/>
                            <label>
                                Seed Phrase:
                                <input
                                    type="text"
                                    value={seedPhrase}
                                    onChange={handleSeedInputChange}
                                />
                            </label>
                            &nbsp;
                            <input
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    )}
                </form>
                {
                    account &&
                    <>
                        <hr/>
                        <AccountDetails account={account}/>
                    </>
                }
            </div>
        </>
    );
};

export default AccountCreate;