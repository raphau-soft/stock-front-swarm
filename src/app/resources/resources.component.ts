import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Resource } from '../dto/resource';
import { ResourceRate } from '../dto/resourceRate';
import { BuyOffer } from '../dto/buyOffer'
import { SellOffer } from '../dto/sellOffer';
import { ResourceDisplay } from '../dto/resourceDisplay';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  displayedColumns1: string[] = ['position', 'company', 'amount', 'maxPrice', 'date', 'delete'];
  displayedColumns2: string[] = ['position', 'company', 'amount', 'minPrice', 'date', 'delete'];
  displayedColumns3: string[] = ['position', 'company', 'amount', 'rate'];
  resources: Resource[]=[];
  resourceRates: ResourceRate[];
  buyOffers: BuyOffer[]= [];
  sellOffers: SellOffer[]=[];
  whichTable = 0;
  resourceDisplay: ResourceDisplay[] = [];

  onDeleteBuyOffer(buyoffer): void{
    this.userService.deleteBuyOffer(buyoffer).subscribe(
      () => {this.reloadPage()}
    );
  }

  onDeleteSellOffer(sellOffer): void{
    this.userService.deleteSellOffer(sellOffer).subscribe(
      () => {this.reloadPage()}
    );
  }

  reloadPage(){
    window.location.reload();
  }
  
  changeData(type){
    if(type == "buyOffers") {
      this.whichTable = 0;
    }
    else if(type == "sellOffers") {
      this.whichTable = 1;
    }
    else if(type == "stocks") {
      this.whichTable = 2;
      console.log(this.resourceDisplay);
    }
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getResources().subscribe(
      data => {
        this.resources = JSON.parse(data).stock;
        this.resourceRates = JSON.parse(data).stockRate;
        for(let i = 0; i < this.resourceRates.length; i++){
          var resource = new Resource();
          for(let j = 0; j < this.resources.length; j++){
            if(this.resourceRates[i].company.name == this.resources[j].company.name){
              resource = this.resources[j];
              break;
            }
          }
          this.resourceDisplay.push(new ResourceDisplay(resource.id, this.resourceRates[i].company, this.resourceRates[i].rate, resource.amount));
        }
      },
      err => {
        this.resources = err.error.message;
      }
    );
    this.userService.getSellOffers().subscribe(
      data => {
        this.sellOffers = JSON.parse(data).sellOffers;
        console.log(this.sellOffers);
      },
      err => {
        this.sellOffers = err.error.message;
      }
    );
    this.userService.getBuyOffers().subscribe(
      data => {
        this.buyOffers = JSON.parse(data).buyOffers;
      },
      err => {
        this.buyOffers = JSON.parse(err.error).message;
      }
    );
  }

}
