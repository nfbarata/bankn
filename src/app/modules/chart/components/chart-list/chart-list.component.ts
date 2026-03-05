import {
  ViewChild,
  ElementRef,
  Component,
  OnInit,
  AfterViewInit,
  inject
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { EventsService } from '../../../../services/events.service';
import { TransactionService } from '../../../../services/transaction.service';
import { MathService } from '../../../../services/math.service';
import { Account } from '../../../../models/account';
import { Transaction } from '../../../../models/transaction';
import Chart, { TooltipItem } from 'chart.js/auto';
import { DineroPipe } from 'src/app/modules/shared/pipes/dinero.pipe';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountCreateCardComponent } from '../../../shared/components/account-create-card/account-create-card.component';
import { AccountSelectCardComponent } from '../../../shared/components/account-select-card/account-select-card.component';
import { TransactionCreateCardComponent } from '../../../shared/components/transaction-create-card/transaction-create-card.component';
import { TransactionsImportCardComponent } from '../../../shared/components/transactions-import-card/transactions-import-card.component';

@Component({
    selector: 'app-chart-list',
    templateUrl: './chart-list.component.html',
    styleUrls: ['./chart-list.component.css'],
    imports: [AccountCreateCardComponent, AccountSelectCardComponent, TransactionCreateCardComponent, TransactionsImportCardComponent, FormsModule, ReactiveFormsModule]
})
export class ChartListComponent implements OnInit, AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly eventsService = inject(EventsService);
  private readonly accountService = inject(AccountService);
  private readonly mathService = inject(MathService);
  private readonly transactionService = inject(TransactionService);
  private readonly dineroPipe = inject(DineroPipe);

  transactions: Transaction[] = [];
  selectedAccounts: Account[] = [];
  accounts: Account[] = [];
  chart?: Chart<'doughnut', number[], string>;

  @ViewChild('chart', { static: false }) chartReference?: ElementRef;
  form = new UntypedFormGroup({
    groupBy: new UntypedFormControl(),
  });

  ngOnInit() {

    this.form.setValue({
      groupBy: 'entity'
    });

    this.refreshAccounts();

    this.eventsService.subscribeAccountSelectionChange(() => this.refreshData());
    this.eventsService.subscribeAccountsChange(() => this.refreshAccounts());
    this.eventsService.subscribeTransactionPeriodChange(() => this.refreshData());

    this.route.paramMap.subscribe((params) => {
      var accountId = params.get('accountId');
      if (accountId == null || accountId.trim().length == 0) {
        //do nothing
      } else {
        this.accounts.forEach((account) => {
          if (account.id == accountId) {
            this.accountService.selectAccount(account);
          } else {
            if (account.selected) {
              this.accountService.toggleAccount(account);
            }
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.refreshData();
  }

  refreshAccounts() {
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }

  refreshData() {
    //clear
    while (this.transactions.length > 0)
      this.transactions.pop();

    this.selectedAccounts = this.accountService.getSelectedAccounts();

    this.selectedAccounts.forEach((account) => {
      this.transactions = this.transactions.concat(this.accountService.getCurrentPeriodTransactions(account));
    });

    if (this.chartReference) {
      if (!this.chart) {
        this.chart = new Chart(
          this.chartReference.nativeElement,
          {
            type: 'doughnut',
            data: {
              labels: [],
              datasets: []
            },
            options: {
              responsive: true,
              plugins: {
                tooltip: {
                  enabled: true
                },
                datalabels: {
                  display: false,
                },
                /*title: {
                  display: true,
                  text: 'Transactions' // i18n
                }*/
              }
            }
          }
        );
        if (this.transactions.length > 0) {
          var usedCurrency = this.transactions[0].amount.toJSON().currency;
          (this.chart.options.plugins!.datalabels as any).formatter = (value: number, _context: any) => {
            return this.dineroPipe.transform(MathService.toDinero(
              value,
              usedCurrency
            ));
          }
          this.chart.options.plugins!.tooltip!.callbacks = {
            label: (tooltipItem: TooltipItem<'doughnut'>) => {
              return this.dineroPipe.transform(MathService.toDinero(
                tooltipItem.raw as number,
                usedCurrency
              )) as string;
            }
          };
        }
      }
      this.refreshChartData();
    } else {
      if(this.chart){
        this.chart.destroy();
      }
      this.chart = undefined;
    }
  }

  refreshChartData() {
    if (this.chart) {

      this.chart.options!.plugins!.datalabels!.display = false;
      while (this.chart.data.datasets.length > 0) {
        this.chart.data.datasets.pop();
      };
      while (this.chart.data.labels!.length > 0) {
        this.chart.data.labels!.pop();
      }
      
      var transactionsBy;
      if (this.form.controls['groupBy'].value == 'entity') {
        transactionsBy = this.transactionService.groupByEntity(this.transactions);
      } else {
        transactionsBy = this.transactionService.groupByCategory(this.transactions);
      }

      if (transactionsBy.size > 0) {
        this.chart.data.labels! = Array.from(transactionsBy.keys());
        this.chart.data.datasets.push({ data: Array.from(transactionsBy.values()).map((d) => d.toJSON().amount) });
        //this.chart.options!.plugins!.datalabels!.display = true;
      }

      this.chart.update();
    } else {
      console.error('Chart not initialized');
    }
  }
}