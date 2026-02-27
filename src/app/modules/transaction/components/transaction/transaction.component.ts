import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../../services/events.service';
import { BanknService } from '../../../../services/bankn.service';
import { AccountService } from '../../../../services/account.service';
import { TransactionService } from '../../../../services/transaction.service';
import { Account } from '../../../../models/account';
import { Transaction } from '../../../../models/transaction';
import { TransactionType } from '../../../../models/enums';
import { Entity } from '../../../../models/entity';
import { Category } from '../../../../models/category';
import { MathService } from '../../../../services/math.service';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transactionTypes = Object.values(TransactionType);
  form = new UntypedFormGroup({
    accountId: new UntypedFormControl(null),
    id: new UntypedFormControl(null),
    amount: new UntypedFormControl(),
    day: new UntypedFormControl(),
    month: new UntypedFormControl(),
    year: new UntypedFormControl(),
    type: new UntypedFormControl(),
    entity: new UntypedFormControl(),
    category: new UntypedFormControl(),
    receiptReference: new UntypedFormControl(),
    description: new UntypedFormControl(),
  });
  accounts: Account[] | null = null;
  entities: Entity[] | null = null;
  categories: Category[] | null = null;

  transaction: Transaction | null = null;

  constructor(
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private mathService: MathService
  ) {}

  ngOnInit() {
    this.refreshAccounts();
    this.refreshCategories();
    this.refreshEntities();
    this.eventsService.accountsChange.subscribe(() => this.refreshAccounts());
    this.eventsService.entitiesChange.subscribe(() => this.refreshEntities());
    this.eventsService.categoriesChange.subscribe(() => this.refreshCategories());

    this.route.paramMap.subscribe((params) => {
      if (this.accounts != null) {
        var account: Account | null;
        var accountId = params.get('accountId');
        if (accountId == null || accountId.trim().length == 0) {
          var selected = this.accountService.getSelectedAccounts();
          if (selected.length > 0) account = selected[0];
          else account = this.accounts[0];
        } else {
          account = this.accountService.getAccount(accountId);
        }
        if (account != null) {
          var transactionId = params.get('transactionId');
          if (transactionId == null || transactionId.trim().length == 0) {
            var now = new Date();
            this.form.setValue({
              accountId: account.id,
              id: null,
              amount: MathService.toInputValue(this.accountService.toDinero(0, account)),
              day: now.getDate(),
              month: now.getMonth() + 1,
              year: now.getFullYear(),
              type: TransactionType.DEBIT.toString(),
              entity: '',
              category: '',
              receiptReference: '',
              description: '',
            });
          } else {
            this.transaction = this.transactionService.getTransaction(
              account,
              transactionId
            );
            if (this.transaction != null) {
              this.form.setValue({
                accountId: account.id,
                id: transactionId,
                amount: MathService.toInputValue(this.transaction.amount),
                day: this.transaction.date.getDate(),
                month: this.transaction.date.getMonth() + 1,
                year: this.transaction.date.getFullYear(),
                type: this.transaction.type.toString(),
                entity: this.transaction.entity == undefined ? '':this.transaction.entity.name,
                category: this.transaction.category == undefined ? '':this.transaction.category.name,
                receiptReference: this.transaction.receiptReference,
                description: this.transaction.description,
              });
            } else {
              console.error('No transaction with that id');
              this.router.navigate(['/transactions']);
            }
          }
        } else {
          console.error('No account with that id');
          this.router.navigate(['/accounts']);
        }
      }
    });
  }

  refreshAccounts() {
    this.accounts = this.accountService.getAccounts();
  }

  refreshEntities() {
    this.entities = this.banknService.getBankn()!.entities;
  }

  refreshCategories() {
    this.categories = this.banknService.getBankn()!.categories;
  }

  onSubmit() {
    var account = this.accountService.getAccount(
      this.form.controls['accountId'].value
    );

    if (account != null) {
      var amount = this.accountService.fromInputValue(
        this.form.controls['amount'].value,
        account
      );

      var date = new Date(0); //clear hours/minutes/seconds
      date.setFullYear(
        this.form.controls['year'].value,
        this.form.controls['month'].value - 1,
        this.form.controls['day'].value
      );

      if (this.form.controls['id'].value == null) {
        //create
        this.transactionService.createTransaction(
          account,
          amount,
          date,
          this.form.controls['type'].value,
          this.form.controls['entity'].value,
          this.form.controls['category'].value,
          this.form.controls['receiptReference'].value,
          this.form.controls['description'].value
        );
      } else {
        //update
        if (this.transaction != null) {
          this.transactionService.updateTransaction(
            account,
            this.transaction,
            amount,
            date,
            this.form.controls['type'].value,
            this.form.controls['entity'].value,
            this.form.controls['category'].value,
            this.form.controls['receiptReference'].value,
            this.form.controls['description'].value
          );
        }
      }
      this.form.reset();
      this.router.navigate(['/transactions']);
    } else {
      alert('Error, try again.'); //I18N
    }
  }

  onDelete(accountId: string, transactionId: string) {
    this.transactionService.deleteTransactionId(accountId, transactionId);
    this.location.back();
    //this.router.navigate([Paths.transactions]);
  }

  onCancel() {
    this.location.back();
  }
}
