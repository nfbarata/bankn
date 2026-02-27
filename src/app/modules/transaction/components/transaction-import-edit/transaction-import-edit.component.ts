import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { TransactionService } from '../../../../services/transaction.service';
import { Account } from '../../../../models/account';
import { Transaction } from '../../../../models/transaction';

@Component({
  selector: 'app-transaction-import-edit',
  templateUrl: './transaction-import-edit.component.html',
  styleUrls: ['./transaction-import-edit.component.css'],
})
export class TransactionImportEditComponent implements OnInit {
  form: UntypedFormGroup;
  formData;
  account: Account | null = null;
  transactions: Transaction[] | null = null;
  //document;
  submitDisabled: boolean = false;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
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
