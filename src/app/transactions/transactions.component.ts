import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Transaction } from '../dto/transactions'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  constructor(private userService: UserService) { }

  transactions: Transaction[];

  ngOnInit(): void {
      this.userService.getTransactions().subscribe(
        data => {this.transactions = JSON.parse(data).transaction;}
      )
  }

}
