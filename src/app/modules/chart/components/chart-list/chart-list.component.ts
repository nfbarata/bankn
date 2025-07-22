import { 
  ViewChild,
  ElementRef,
  Component, 
  OnInit,
  AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { EventsService } from '../../../../services/events.service';
import { TransactionService } from '../../../../services/transaction.service';
import { MathService } from '../../../../services/math.service';
import { Account } from '../../../../models/account';
import { Transaction } from '../../../../models/transaction';
import Chart, { ChartItem } from 'chart.js/auto'
import { DineroPipe } from 'src/app/modules/shared/pipes/dinero.pipe';
//import { AccountCreateCardComponent } from "../../../shared/components/account-create-card/account-create-card.component";
//import { AccountSelectCardComponent } from "../../../shared/components/account-select-card/account-select-card.component";
//import { TransactionCreateCardComponent } from "../../../shared/components/transaction-create-card/transaction-create-card.component";
//import { TransactionsImportCardComponent } from "../../../shared/components/transactions-import-card/transactions-import-card.component";

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css'],
  //imports: [AccountCreateCardComponent, AccountSelectCardComponent, TransactionCreateCardComponent, TransactionsImportCardComponent],
})
export class ChartListComponent implements OnInit, AfterViewInit {
  transactions: Transaction[] = [];
  selectedAccounts: Account[] = [];
  accounts: Account[] = [];
  chartByEntity!: Chart<'pie', number[], string>;
  chartByCategory!: Chart<'pie', number[], string>;

  @ViewChild('chartByEntity', { static: false }) chartByEntityReference!: ElementRef;
  @ViewChild('chartByCategory', { static: false }) chartByCategoryReference!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private accountService: AccountService,
    private mathService: MathService,
    private transactionService: TransactionService,
    private dineroPipe: DineroPipe,
  ) {}

  ngOnInit() {

    this.refreshAccounts();

    this.eventsService.accountSelectionChange.subscribe(() => this.refreshData());

    this.eventsService.accountsChange.subscribe(() => this.refreshAccounts());

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
    this.chartByEntity = new Chart(
      this.chartByEntityReference.nativeElement,
      {
        type: 'pie',
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false
            },
            title: {
              display: true,
              text: 'Transactions by Entity' // i18n
            }
          }
        }
      }
    );
    this.chartByCategory = new Chart(
      this.chartByCategoryReference.nativeElement,
      {
        type: 'pie',
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false
            },
            title: {
              display: true,
              text: 'Transactions by Category' // i18n
            }
          }
        }
      }
    );
    this.refreshChartData();
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
      this.transactions = this.transactions.concat(account.transactions);
    });

    if(this.chartByEntity!=null){
      this.refreshChartData();
    }
  }

  refreshChartData(){

    while(this.chartByEntity.data.labels!.length>0){
      this.chartByEntity.data.labels!.pop();
    }
    while(this.chartByEntity.data.datasets.length>0) {
      this.chartByEntity.data.datasets.pop();
    };

    var transactionsByEntity = this.transactionService.groupByEntity(this.transactions);

    if(transactionsByEntity.size > 0) {

      var usedCurrency = transactionsByEntity.values().next().value!.toJSON().currency;

      this.chartByEntity.data.labels! = Array.from(transactionsByEntity.keys());
      this.chartByEntity.data.datasets.push({data: Array.from(transactionsByEntity.values()).map((d) => d.toJSON().amount)});
      this.chartByEntity.options.plugins!.datalabels =  {
            formatter: (value, context) => {
              return this.dineroPipe.transform(MathService.toDinero(
                parseFloat(value),
                usedCurrency
              ));
            }
          };
    }
    this.chartByEntity.update();

    while(this.chartByCategory.data.labels!.length>0){
      this.chartByCategory.data.labels!.pop();
    }
    while(this.chartByCategory.data.datasets.length>0) {
      this.chartByCategory.data.datasets.pop();
    };

    var transactionsByCategory = this.transactionService.groupByCategory(this.transactions);

    if(transactionsByCategory.size > 0) {

      var usedCurrency = transactionsByCategory.values().next().value!.toJSON().currency;

      this.chartByCategory.data.labels! = Array.from(transactionsByCategory.keys());
      this.chartByCategory.data.datasets.push({data: Array.from(transactionsByCategory.values()).map((d) => d.toJSON().amount)});
      this.chartByCategory.options.plugins!.datalabels =  {
            formatter: (value, context) => {
              return this.dineroPipe.transform(MathService.toDinero(
                parseFloat(value),
                usedCurrency
              ));
            }
          };
    }
    this.chartByCategory.update();
  }
}
