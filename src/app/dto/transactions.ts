import { BuyOffer } from './buyOffer';
import { SellOffer } from './sellOffer';


export class Transaction{

    id: number;
    buyOffer: BuyOffer;
    sellOffer: SellOffer;
    amount: number;
    price: number;
    date: Date;

}