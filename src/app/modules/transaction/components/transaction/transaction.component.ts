import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import { CategoryService } from 'src/app/services/category.service';
import { UtilsService } from '../../../../services/utils.service';

@Component({
    selector: 'transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css'],
    standalone: false
})
export class TransactionComponent implements OnInit {
  transactionTypes = Object.values(TransactionType);
  form: FormGroup;

  accounts: Account[] | null = null;
  entities: Entity[] | null = null;
  categories: Category[] | null = null;

  transaction: Transaction | null = null;

  constructor(
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private mathService: MathService
  ) {
    this.form = new FormGroup({
      accountId: new FormControl(),
      id: new FormControl(),
      amount: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      entity: new FormControl(),
      category: new FormControl(),
      receiptReference: new FormControl(),
      description: new FormControl()
    });
  }

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
              date: UtilsService.formatDate(now, "YYYY-MM-DD"),
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
                date: UtilsService.formatDate(this.transaction.date, "YYYY-MM-DD"),
                type: this.transaction.type.toString(),
                entity: this.transaction.entity ? this.transaction.entity.name : '',
                category: this.transaction.category ? CategoryService.getFullCategoryName(this.transaction.category) : '',
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
    this.categories = CategoryService.getAllCategories(this.banknService.getBankn()!);
  }

  onSubmit() {
    if (this.form.valid) {
      var account = this.accountService.getAccount(
        this.form.value.accountId
      );

      if (account != null) {
        var amount = this.accountService.fromInputValue(
          this.form.value.amount,
          account
        );

        if (this.form.controls['id'].value == null) {
          //create
          this.transactionService.createTransaction(
            account,
            amount,
            UtilsService.removeTime(new Date(this.form.value.date)),
            this.form.value.type,
            this.form.value.entity,
            this.form.value.category,
            this.form.value.receiptReference,
            this.form.value.description
          );
        } else {
          //update
          if (this.transaction != null) {
            this.transactionService.updateTransaction(
              account,
              this.transaction,
              amount,
              UtilsService.removeTime(new Date(this.form.value.date)),
              this.form.value.type,
              this.form.value.entity,
              this.form.value.category,
              this.form.value.receiptReference,
              this.form.value.description
            );
          }
        }
        this.form.reset();
        this.router.navigate(['/transactions']);
      } else {
        alert('Error, try again.'); //I18N
      }
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
