import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ResourceRate } from '../dto/resourceRate';

@Component({
  selector: 'app-buy-offers',
  templateUrl: './buy-offers.component.html',
  styleUrls: ['./buy-offers.component.css']
})
export class BuyOffersComponent implements OnInit {

  form: any = {};
  isAddFailed = false;
  errorMessage: string;
  resourceRates: ResourceRate[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllResources().subscribe(
      data => {
        this.resourceRates = JSON.parse(data).stockRate;
      }
    );
  }

  onSubmit(): void{
    this.userService.postBuyOffer(this.form).subscribe(
      data => {this.reloadPage();
      },
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
