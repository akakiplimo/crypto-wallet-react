import React from "react";
import {generateAccount} from "../../../utils/AccountUtils.ts";
import AccountDetails from "./AccountDetails.tsx";
import {Account} from "../../../models/Account.ts";
import boltLogo from "../../../assets/blueBolt.png"
import {StyledButton, StyledForm, StyledInput, StyledLabel} from "../../presentational/Form.tsx";

const recoveryPhraseKeyName = 'recoveryPhrase';

const AccountCreate: React.FC = () => {
    const [showRecoverInput, setShowRecoverInput] = React.useState(false);
    const [seedPhrase, setSeedPhrase] = React.useState('');
    const [account, setAccount] = React.useState<Account | null>(null)

    async function createAccount() {
        // Call the generateAccount function with no arguments
        const result = await generateAccount();

        // Update the account state with the newly created account
        setAccount(result.account);
        console.log('acc: ', result.account)

        if (localStorage.getItem(recoveryPhraseKeyName) !== result.seedPhrase) {
            localStorage.setItem(recoveryPhraseKeyName, result.seedPhrase);
        }
    }

    const recoverAccount = React.useCallback(
        // recoverAccount could be used without recoveryPhrase as an argument, but then we would have to
        // put it in a deps array.
        async (recoveryPhrase: string) => {

            // Call the generateAccount function with no arguments
            // Call the generateAccount function and pass it 0 and the current seedPhrase
            const result = generateAccount(recoveryPhrase);

            // Update the account state with the newly recovered account
            setAccount(result.account);
            console.log(result.account)

            if (localStorage.getItem(recoveryPhraseKeyName) !== recoveryPhrase) {
                localStorage.setItem(recoveryPhraseKeyName, recoveryPhrase);
            }

            setSeedPhrase('')

        }, []
    );

    const handleSeedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeedPhrase(event.target.value);
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            recoverAccount(seedPhrase).then(() => {
            });
        }
    }

    React.useEffect(() => {

        const localStorageRecoveryPhrase = localStorage.getItem(recoveryPhraseKeyName)
        if (localStorageRecoveryPhrase) {
            setSeedPhrase(localStorageRecoveryPhrase);
            recoverAccount(localStorageRecoveryPhrase).then(r => console.log(r));
        }
    }, [recoverAccount])

    return (
        <>
            <img src={boltLogo} width="80" alt="zapp-logo"/>
            <h1>
                Zapp Wallet
            </h1>
            <div>
                <StyledForm onSubmit={event => event.preventDefault()}>
                    <StyledButton onClick={createAccount}>Create Account</StyledButton>
                    &nbsp;&nbsp;
                    <StyledButton
                        onClick={() => showRecoverInput ? recoverAccount(seedPhrase) : setShowRecoverInput(true)}
                        disabled={showRecoverInput && !seedPhrase}
                    >
                        Recover Account
                    </StyledButton>
                    {showRecoverInput && (
                        <div>
                            <hr/>
                            <StyledLabel>Seed Phrase:</StyledLabel>
                            <StyledInput
                                type="text"
                                value={seedPhrase}
                                onChange={handleSeedInputChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    )}
                </StyledForm>
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