import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'account-create-card',
    templateUrl: './account-create-card.component.html',
    styleUrls: ['./account-create-card.component.css'],
    imports: [RouterLink]
})
export class AccountCreateCardComponent {

}
