import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { BanknService } from '../../services/bankn.service';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { TransactionType } from '../../models/enums';
import { Entity } from '../../models/entity';
import { Category } from '../../models/category';
import { MathService } from '../../services/math.service';
import { CategoryService } from 'src/app/services/category.service';
import { UtilsService } from '../../services/utils.service';
import { CategoryPipe } from "../../pipes/category.pipe";
import { TransactionTypePipe } from "../../pipes/transactionType.pipe";

@Component({
  selector: 'transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, CategoryPipe, TransactionTypePipe],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit, OnDestroy {
  private readonly eventsService = inject(EventsService);
  private readonly banknService = inject(BanknService);
  private readonly accountService = inject(AccountService);
  private readonly transactionService = inject(TransactionService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly mathService = inject(MathService);

  private subscriptions = new Subscription();

  transactionTypes = Object.values(TransactionType);
  form: FormGroup;

  accounts: Account[] | null = null;
  entities: Entity[] | null = null;
  categories: Category[] | null = null;

  transaction: Transaction | null = null;

  constructor() {
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
    this.subscriptions.add(this.eventsService.subscribeAccountsChange(() => this.refreshAccounts()));
    this.subscriptions.add(this.eventsService.subscribeEntitiesChange(() => this.refreshEntities()));
    this.subscriptions.add(this.eventsService.subscribeCategoriesChange(() => this.refreshCategories()));

    this.subscriptions.add(this.route.paramMap.subscribe((params) => {
      this.form.controls['accountId'].enable();
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
              this.form.controls['accountId'].disable();
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
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

      var account = this.transaction != null ?
        this.transaction.account :
        this.accountService.getAccount(this.form.value.accountId);

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
            new Date(this.form.value.date),
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
              new Date(this.form.value.date),
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
