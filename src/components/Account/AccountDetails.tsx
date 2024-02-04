import React from "react";
import {Account} from "../../models/Account.ts";

interface AccountDetailProps {
    account: Account
}

const AccountDetails: React.FC<AccountDetailProps> = ({account}) => {

    return (
        <>Address: {account.address}</>
    )
}

export default AccountDetails;