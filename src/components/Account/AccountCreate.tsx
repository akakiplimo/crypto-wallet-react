import * as React from "react";
import {generateKeys} from "../../utils/AccountUtils.ts";

const AccountCreate: React.FC = () => {
    const [showSeedInput, setShowSeedInput] = React.useState(false);
    const [seedPhrase, setSeedPhrase] = React.useState('');

    const createAccount = () => {
        // Code to create Account comes here
        const keys = generateKeys();
        console.log(keys);
    };

    const handleRecoverClick = () => {
        setShowSeedInput(!showSeedInput);
    };

    const handleSeedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeedPhrase(event.target.value);
    };

    const handleSeedPhraseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        generateKeys(seedPhrase)
        // Reset state after processing
        setShowSeedInput(false);
        setSeedPhrase('');
    };

    return (
        <div>
            <button onClick={createAccount}>Create Account</button>
            &nbsp;&nbsp;
            <button onClick={handleRecoverClick}>Recover Account</button>
            {showSeedInput && (
                <div>
                    <hr/>
                    <form onSubmit={handleSeedPhraseSubmit}>
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
                    </form>
                </div>
            )}
        </div>
    );
};

export default AccountCreate;