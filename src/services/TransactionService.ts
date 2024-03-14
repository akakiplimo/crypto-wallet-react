import {goerli} from "../models/Chain.ts";
import axios from "axios";

export class TransactionService {
    static API_URL = 'https://deep-index.moralis.io/api/v2.2';
    static API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImUxY2M2NzE2LTgwODgtNGE0NS05MDYwLTJhMGUyZDUyMTIzMSIsIm9yZ0lkIjoiMzc2NTQyIiwidXNlcklkIjoiMzg2OTUzIiwidHlwZUlkIjoiNDQ1NjExOTktNDc3Ny00ZTA2LThkOGMtZDg3N2Q2YzA4MDY5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDc1MDU0ODEsImV4cCI6NDg2MzI2NTQ4MX0.95mP4fTA_zBmPo5q1McVvTT-QAnLvAcwMZO4TsIPyYY';

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