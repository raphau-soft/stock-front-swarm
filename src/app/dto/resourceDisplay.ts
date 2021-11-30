import { User } from './user'
import { Company } from './company'

export class ResourceDisplay {
    // TODO: wszystko
    id: number;
    company: Company;
    rate: number;
    amount: number;

    constructor(id, company, rate, amount){
        this.id = id;
        this.company = company;
        this.rate = rate;
        this.amount = amount;
    }

}