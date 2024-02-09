import {goerli} from "../models/Chain.ts";
import axios from "axios";

export class TransactionService {
    static API_URL = process.env.MORALIS_API_URL;
    static API_KEY = process.env.MORALIS_API_KEY;

    static async getTransactions(address: string) {
        const options = {
            method: 'GET',
            url: `${TransactionService.API_URL}/${address}`,
            params: {chain: goerli.name.toLowerCase()},
            headers: {accept: 'application/json', 'X-API-Key': TransactionService.API_KEY},
        };

        const response = await axios.request(options);
        return response;
    }
}