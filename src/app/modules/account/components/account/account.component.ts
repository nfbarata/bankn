import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  UntypedFormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BanknService } from '../../../../services/bankn.service';
import { AccountService } from '../../../../services/account.service';
import { UtilsService } from '../../../../services/utils.service';
import { MathService } from '../../../../services/math.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {

  form: FormGroup;
  countries: any; //used on UI

  constructor(
    private banknService: BanknService,
    private accountService: AccountService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private utilsService: UtilsService,
  ) {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      referenceAmount: new FormControl('', [Validators.required]),
      referenceCountry: new FormControl('', [Validators.required]),
      referenceDate: new FormControl('', [Validators.required]),
      description: new FormControl(),
    });
  }

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
            referenceDate: [account.referenceDate.getFullYear(), ('0' + (account.referenceDate.getMonth() + 1)).slice(-2), ('0' + account.referenceDate.getDate()).slice(-2)].join('-'),
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
          new Date(this.form.value.referenceDate),
          this.form.value.referenceCountry,
          amount //.toObject(),
        );
      } else {
        this.accountService.updateAccount(
          this.form.value.id,
          this.form.value.name,
          this.form.value.description,
          amount, //.toObject(),
          new Date(this.form.value.referenceDate),
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
