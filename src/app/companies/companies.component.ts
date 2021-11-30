import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  form: any = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.userService.postCompany(this.form).subscribe(
      () => {this.reloadPage()}
    );
  }

  reloadPage(){
    window.location.reload();
  }


}
