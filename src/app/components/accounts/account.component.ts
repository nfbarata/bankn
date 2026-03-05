import { Component, OnInit, inject } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BanknService } from '../../services/bankn.service';
import { AccountService } from '../../services/account.service';
import { UtilsService } from '../../services/utils.service';
import { MathService } from '../../services/math.service';

@Component({
    selector: 'account',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private readonly banknService = inject(BanknService);
  private readonly accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly utilsService = inject(UtilsService);

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    referenceAmount: new FormControl('', [Validators.required]),
    referenceCountry: new FormControl('', [Validators.required]),
    referenceDate: new FormControl('', [Validators.required]),
    description: new FormControl(),
  });
  countries: any; //used on UI

  ngOnInit() {
    this.countries = this.utilsService.getCountries();
    this.route.paramMap.subscribe((params) => {
      var accountId = params.get('accountId');

      if (accountId == null || accountId.trim().length == 0) {
        this.form.setValue({
          id: null,
          name: 'Main',
          referenceAmount: MathService.toInputValue(this.accountService.toDinero(0, null)),
          referenceCountry: this.banknService.getReferenceCountry(),
          referenceDate: '2000-01-01',
          description: '',
        });
      } else {
        var account = this.accountService.getAccount(accountId);
        if (account != null) {
          this.form.setValue({
            id: account.id,
            name: account.name,
            referenceAmount: MathService.toInputValue(account.referenceAmount),
            referenceCountry: account.referenceCountry,
            referenceDate: UtilsService.formatDate(account.referenceDate, "YYYY-MM-DD"),
            description: account.description,
          });
        }
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      var amount = MathService.fromInputValue(
        this.form.value.referenceAmount,
        this.form.value.referenceCountry
      );

      if (this.form.value.id == null) {
        this.accountService.createAccount(
          this.form.value.name,
          this.form.value.description,
          UtilsService.removeTime(new Date(this.form.value.referenceDate)),
          this.form.value.referenceCountry,
          amount //.toObject(),
        );
      } else {
        this.accountService.updateAccount(
          this.form.value.id,
          this.form.value.name,
          this.form.value.description,
          amount, //.toObject(),
          UtilsService.removeTime(new Date(this.form.value.referenceDate)),
          this.form.value.referenceCountry
        );
      }
      this.form.reset();
      this.router.navigate(['']);
    }
  }

  onDelete(accountId: string) {
    this.accountService.deleteAccountId(accountId);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
