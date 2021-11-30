import { Company } from './company';

export class BuyOffer {

    id: number;
    company: Company;
    user: string;
    maxPrice: number;
    startAmount: number;
    amount: number;
    dateLimit: Date;
    actual: boolean;

}