import { Component, inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { DatePipe, CommonModule } from '@angular/common';
import { TransactionPipe } from "../../pipes/transaction.pipe";
import { CategoryPipe } from "../../pipes/category.pipe";

@Component({
    selector: 'app-transaction-import-edit',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TransactionPipe, CategoryPipe],
    templateUrl: './transaction-import-edit.component.html',
    styleUrls: ['./transaction-import-edit.component.css']
})
export class TransactionImportEditComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly transactionService = inject(TransactionService);
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  form: UntypedFormGroup;
  formData;
  account: Account | null = null;
  transactions: Transaction[] | null = null;
  //document;
  submitDisabled: boolean = false;

  constructor(
  ) {
    this.formData = {
      importData: null,
    };
    this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.account = null;
    this.transactions = this.transactionService.filterTransactions;
    this.route.paramMap.subscribe((params) => {
      var accountId = params.get('accountId');
      if (accountId != null) {
        this.account = this.accountService.getAccount(accountId);
        if (this.account == null) {
          this.router.navigate(['']);
        } else if (this.transactions == null || this.transactions.length == 0) {
          alert('No transactions to edit'); //i18n
          this.router.navigate(['/transactions/import/' + this.account.id]);
        }
      }
    });
  }

  onSubmit(data: any) {
    if (this.account != null && this.transactions != null) {
      //TODO processar categorias/entities
      this.transactions.forEach((transaction) => {
        if (this.account != null)
          this.transactionService.createTransaction(
            this.account,
            transaction.amount,
            transaction.date,
            transaction.type,
            transaction.entity == undefined ? '' : transaction.entity.name,
            transaction.category == undefined ? '' : transaction.category.name,
            transaction.receiptReference,
            transaction.description
          );
      });

      this.form.reset();
      this.accountService.selectAccount(this.account);
      this.router.navigate(['/transactions/' + this.account.id]);
    } else {
      console.error('No account selected');
      this.router.navigate(['/accounts']);
    }
  }
}
