import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { UserService } from '../_services/user.service';
import { Conf } from '../dto/conf'



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  conf: Conf = null;
  isConfigurationFailed = false;
  isConfigurationChanged = false;
  isNameTaken = false;
  isTestRunning = false;
  testForm: any = {};
  isTrafficTestClean = false;
  isStockTestClean = false;
  isDBRestarted = false;

  value = 30;
  form: any = {
    stockPlay: 90,
    strategy: 'Random company, high price',
    createBuyOffer: 45,
    createSellOffer: 45,
    deleteBuyOffer: 5,
    deleteSellOffer: 5,
    logout: 10,
    dataCheck: 10,
    checkBuyOffers: 33,
    checkSellOffers: 33,
    checkUserData: 34,
  };

  strategies: string[] = ['Random company, high price', 'Random companies, random prices'];
  // , 'Random companies, low prices'

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTrafficConf().subscribe(
      data => {
        this.conf = JSON.parse(data).conf;
        this.form.stockPlay = this.conf.stockPlay * 100;
        this.form.strategy = this.conf.strategy;
        this.form.createBuyOffer = this.conf.createBuyOffer * 100;
        this.form.createSellOffer = this.conf.createSellOffer * 100;
        this.form.deleteBuyOffer = this.conf.deleteBuyOffer * 100;
        this.form.deleteSellOffer = this.conf.deleteSellOffer * 100;
        this.form.dataCheck = this.conf.dataCheck * 100;
        this.form.checkBuyOffers = this.conf.checkBuyOffers * 100;
        this.form.checkSellOffers = this.conf.checkSellOffers * 100;
        this.form.checkUserData = this.conf.checkUserData * 100;
        this.form.numberOfUsers = this.conf.numberOfUsers;
        this.form.timeBetweenRequests = this.conf.timeBetweenRequests;
        this.form.testTime = this.conf.testTime / 1000;
        this.form.requestsNumber = this.conf.requestsNumber;
        this.form.strategy = this.strategies[this.conf.strategy];
      }
    );
  }

  onSubmitRun() {
    this.isTestRunning = true;
    this.userService.setTestName(this.testForm.testName).subscribe(
      () => {this.userService.runTest(this.testForm.testName).subscribe(
        () => {this.isNameTaken = false;this.isTestRunning = false; },
        () => {this.isNameTaken = true;this.isTestRunning = false;}
      );},
      () => {this.isNameTaken = true;this.isTestRunning = false;}
    )
    
  }

  onSubmit(): void{
    console.log("OnSubmit")
    let conf = new Conf();
    this.isConfigurationChanged = false;
    conf.checkBuyOffers = this.form.checkBuyOffers/100;
    conf.checkSellOffers = this.form.checkSellOffers/100;
    conf.checkUserData = this.form.checkUserData/100;
    conf.continueDataChecking = this.form.continueDataCheck/100;
    conf.continueStockPlaying = this.form.continueStockPlaying/100;
    conf.createBuyOffer = this.form.createBuyOffer/100;
    conf.createCompany = this.form.createCompany/100;
    conf.createSellOffer = this.form.createSellOffer/100;
    conf.dataCheck = this.form.dataCheck/100;
    conf.deleteBuyOffer = this.form.deleteBuyOffer/100;
    conf.deleteSellOffer = this.form.deleteSellOffer/100;
    conf.numberOfUsers = this.form.numberOfUsers;
    conf.stockPlay = this.form.stockPlay/100;
    conf.strategy = this.strategies.indexOf(this.form.strategy);
    conf.timeBetweenRequests = this.form.timeBetweenRequests;
    conf.testTime = this.form.testTime * 1000;
    conf.requestsNumber = this.form.requestsNumber;
    this.userService.setTrafficConf(conf).subscribe(
      data => {
        this.isConfigurationChanged = true;
        this.isConfigurationFailed = false;
        setTimeout(() => this.isConfigurationChanged = false, 2500)
      },
      err => {
        this.isConfigurationFailed = true;
      }
    );
  }

  cleanDB() {
    this.userService.cleanTrafficDB().subscribe(
      () => {this.isTrafficTestClean = true; setTimeout(() => this.isTrafficTestClean = false, 2500)},
    );
    this.userService.cleanStockTestDB().subscribe(
      () => {this.isStockTestClean = true; setTimeout(() => this.isStockTestClean = false, 2500)},
    );
  }

  restartStockDB(){
    this.userService.restartStockDB().subscribe(
      () => {this.isDBRestarted = true; setTimeout(() => this.isDBRestarted = false, 2500)},
    );
  }

  onChanceStockChange(event: MatSliderChange){
    this.form.stockPlay = event.value;
    this.form.dataCheck = 100 - event.value;
  }

  onChanceDataChange(event: MatSliderChange){
    this.form.dataCheck = event.value;
    this.form.stockPlay = 100 - event.value;
  }
  
  onContDataCheckChange(event: MatSliderChange){
    this.form.continueDataCheck = event.value;
  }

  onContStockPlayChange(event: MatSliderChange){
    this.form.continueStockPlaying = event.value;
  }

  onBOCheckChange(event: MatSliderChange){
    this.form.checkBuyOffers = event.value;
    if(this.form.checkUserData <= 0){
      this.form.checkUserData = 0;
      this.form.checkSellOffers = 100 - event.value;
    } else  {
      this.form.checkUserData = 100 - event.value - this.form.checkSellOffers;
      if(this.form.checkUserData < 0){
        this.form.checkSellOffers = this.form.checkSellOffers + this.form.checkUserData;
        this.form.checkUserData = 0;
      }
    }
  }

  onSOCheckChange(event: MatSliderChange){
    this.form.checkSellOffers = event.value;
    if(this.form.checkUserData <= 0){
      this.form.checkUserData = 0;
      this.form.checkBuyOffers = 100 - event.value;
    } else {
      this.form.checkUserData = 100 - event.value - this.form.checkBuyOffers;
      if(this.form.checkUserData < 0){
        this.form.checkBuyOffers = this.form.checkBuyOffers + this.form.checkUserData;
        this.form.checkUserData = 0;
      }
    }
  }

  onUDCheckChange(event: MatSliderChange){
    this.form.checkUserData = event.value;
    if(this.form.checkBuyOffers <= 0){
      this.form.checkBuyOffers = 0;
      this.form.checkSellOffers = 100 - event.value;
    } else {
      this.form.checkBuyOffers = 100 - event.value - this.form.checkSellOffers;
      if(this.form.checkBuyOffers < 0){
        this.form.checkSellOffers = this.form.checkSellOffers + this.form.checkBuyOffers;
        this.form.checkBuyOffers = 0;
      }
    }
  }

  onCreateCompChange(event: MatSliderChange){
    this.form.createCompany = event.value;
    
    if(this.form.deleteSellOffer != 0){
      this.form.deleteSellOffer = 100  - event.value - this.form.deleteBuyOffer - this.form.createSellOffer - this.form.createBuyOffer;
      if(this.form.deleteSellOffer < 0){
        this.form.deleteBuyOffer += this.form.deleteSellOffer;
        this.form.deleteSellOffer = 0;
        if(this.form.deleteBuyOffer < 0){
          this.form.createSellOffer += this.form.deleteBuyOffer;
          this.form.deleteBuyOffer = 0;
          if(this.form.createSellOffer < 0){
            this.form.createBuyOffer += this.form.createSellOffer;
            this.form.createSellOffer = 0;
          }
        }
      }
    } else if(this.form.deleteBuyOffer != 0){
      this.form.deleteBuyOffer = 100 - event.value - this.form.createSellOffer - this.form.createBuyOffer;
    } else if(this.form.createSellOffer != 0){
      this.form.createSellOffer = 100 - event.value - this.form.createBuyOffer;
    } else {
      this.form.createBuyOffer = 100 - event.value;
    }

  }
  
  onCreateBOChange(event: MatSliderChange){
    this.form.createBuyOffer = event.value;
    
    if(this.form.deleteSellOffer != 0){
      this.form.deleteSellOffer = 100  - event.value - this.form.deleteBuyOffer - this.form.createSellOffer - this.form.createCompany;
      if(this.form.deleteSellOffer < 0){
        this.form.deleteBuyOffer += this.form.deleteSellOffer;
        this.form.deleteSellOffer = 0;
        if(this.form.deleteBuyOffer < 0){
          this.form.createSellOffer += this.form.deleteBuyOffer;
          this.form.deleteBuyOffer = 0;
          if(this.form.createSellOffer < 0){
            this.form.createCompany += this.form.createSellOffer;
            this.form.createSellOffer = 0;
          }
        }
      }
    } else if(this.form.deleteBuyOffer != 0){
      this.form.deleteBuyOffer = 100 - event.value - this.form.createSellOffer - this.form.createCompany;
    } else if(this.form.createSellOffer != 0){
      this.form.createSellOffer = 100 - event.value - this.form.createCompany;
    } else {
      this.form.createCompany = 100 - event.value;
    }

  }
  
  onCreateSOChange(event: MatSliderChange){
    this.form.createSellOffer = event.value;
    
    if(this.form.deleteSellOffer != 0){
      this.form.deleteSellOffer = 100  - event.value - this.form.deleteBuyOffer - this.form.createCompany - this.form.createBuyOffer;
      if(this.form.deleteSellOffer < 0){
        this.form.deleteBuyOffer += this.form.deleteSellOffer;
        this.form.deleteSellOffer = 0;
        if(this.form.deleteBuyOffer < 0){
          this.form.createBuyOffer += this.form.deleteBuyOffer;
          this.form.deleteBuyOffer = 0;
          if(this.form.createBuyOffer < 0){
            this.form.createCompany += this.form.createBuyOffer;
            this.form.createBuyOffer = 0;
          }
        }
      }
    } else if(this.form.deleteBuyOffer != 0){
      this.form.deleteBuyOffer = 100 - event.value - this.form.createCompany - this.form.createBuyOffer;
    } else if(this.form.createBuyOffer != 0){
      this.form.createBuyOffer = 100 - event.value - this.form.createCompany;
    } else {
      this.form.createCompany = 100 - event.value;
    }
  }
  
  onDeleteBOChange(event: MatSliderChange){
    this.form.deleteBuyOffer = event.value;
    
    if(this.form.deleteSellOffer != 0){
      this.form.deleteSellOffer = 100  - event.value - this.form.createSellOffer - this.form.createCompany - this.form.createBuyOffer;
      if(this.form.deleteSellOffer < 0){
        this.form.createBuyOffer += this.form.deleteSellOffer;
        this.form.deleteSellOffer = 0;
        if(this.form.createBuyOffer < 0){
          this.form.createCompany += this.form.createBuyOffer;
          this.form.createBuyOffer = 0;
          if(this.form.createCompany < 0){
            this.form.createSellOffer += this.form.createCompany;
            this.form.createCompany = 0;
          }
        }
      }
    } else if(this.form.createSellOffer != 0){
      this.form.createSellOffer = 100 - event.value - this.form.createCompany - this.form.createBuyOffer;
    } else if(this.form.createBuyOffer != 0){
      this.form.createBuyOffer = 100 - event.value - this.form.createCompany;
    } else {
      this.form.createCompany = 100 - event.value;
    }
  }
  
  onDeleteSOChange(event: MatSliderChange){
    this.form.deleteSellOffer = event.value;
    
    if(this.form.deleteBuyOffer != 0){
      this.form.deleteBuyOffer = 100  - event.value - this.form.createSellOffer - this.form.createCompany - this.form.createBuyOffer;
      if(this.form.deleteBuyOffer < 0){
        this.form.createSellOffer += this.form.deleteBuyOffer;
        this.form.deleteBuyOffer = 0;
        if(this.form.createSellOffer < 0){
          this.form.createBuyOffer += this.form.createSellOffer;
          this.form.createSellOffer = 0;
          if(this.form.createBuyOffer < 0){
            this.form.createCompany += this.form.createBuyOffer;
            this.form.createBuyOffer = 0;
          }
        }
      }
    } else if(this.form.createSellOffer != 0){
      this.form.createSellOffer = 100 - event.value - this.form.createCompany - this.form.createBuyOffer;
    } else if(this.form.createBuyOffer != 0){
      this.form.createBuyOffer = 100 - event.value - this.form.createCompany;
    } else {
      this.form.createCompany = 100 - event.value;
    }
  }
  

}
