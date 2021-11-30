import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../dto/user'

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.user = JSON.parse(data).user;
      },
      err => {
        // this.user = err.error.message;
      }
    )
  }

}
