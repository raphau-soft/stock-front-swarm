import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stock';
  private roles: string[];
  isLoggedIn = false;
  username: string;

  constructor(private token: TokenStorageService, 
    private router: Router){}

  ngOnInit(): void{
    this.isLoggedIn = !!this.token.getToken();

    if(this.isLoggedIn){
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  logout(): void{
    this.token.signOut();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/signin');
  }
}
