import { Company } from './company';
import { User } from './user';

export class SellOffer{

    id: number;
    user: User;
    company: Company;
    startAmount: number;
    amount: number;
    dateLimit: Date;
    actual: boolean;

}