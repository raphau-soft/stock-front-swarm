import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ResourceRate } from '../dto/resourceRate';
import { Resource } from '../dto/resource';
import { ResourceDisplay } from '../dto/resourceDisplay';

@Component({
  selector: 'app-sell-offers',
  templateUrl: './sell-offers.component.html',
  styleUrls: ['./sell-offers.component.css']
})
export class SellOffersComponent implements OnInit {

  form: any = {};
  stockRates: ResourceRate[];
  resources: Resource[];
  resourceDisplay: ResourceDisplay[] = [];
  isAddFailed = false;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getResources().subscribe(
      data => {
        this.stockRates = JSON.parse(data).stockRate;
        this.resources = JSON.parse(data).stock;
        for(let i = 0; i < this.stockRates.length; i++){
          var resource = new Resource();
          for(let j = 0; j < this.resources.length; j++){
            if(this.stockRates[i].company.name == this.resources[j].company.name){
              resource = this.resources[j];
              break;
            }
          }
          this.resourceDisplay.push(new ResourceDisplay(resource.id, this.stockRates[i].company, this.stockRates[i].rate, resource.amount));
        }
      },
      err => {
      }
    );
  }

  onSubmit(): void{
    console.log(this.form.date);
    this.userService.postSellOffer(this.form).subscribe(
      () => {this.reloadPage()},
      err => {
        this.isAddFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage(){
    window.location.reload();
  }

}
