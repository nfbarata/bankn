import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../../../../services/account.service';

@Component({
    selector: 'account-create-card',
    templateUrl: './account-create-card.component.html',
    styleUrls: ['./account-create-card.component.css'],
    standalone: false
})
export class AccountCreateCardComponent implements OnInit {
  private accountService = inject(AccountService);


  ngOnInit() {}
}
