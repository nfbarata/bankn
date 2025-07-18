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

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css'],
})
export class ChartListComponent implements OnInit, AfterViewInit {
  transactions: Transaction[] = [];
  selectedAccounts: Account[] = [];
  accounts: Account[] = [];

  @ViewChild('chart', { static: false }) chart!: ElementRef;

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
    var transactionsByEntity = this.transactionService.groupByEntity(this.transactions);
    var usedCurrency = transactionsByEntity.values().next().value!.toJSON().currency;
    new Chart(
      this.chart.nativeElement,
      {
        type: 'pie',
        data: {
          labels: Array.from(transactionsByEntity.keys()),
          datasets: [{data: Array.from(transactionsByEntity.values()).map((d) => d.toJSON().amount)}]
        }, 
        options: {
          plugins: {
            tooltip: {
              enabled: false
            },
            datalabels: {
              formatter: (value, context) => {
                return this.dineroPipe.transform(MathService.toDinero(
                  parseFloat(value),
                  usedCurrency
                ));
              }
            }
          }
        }
      }
    );
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
  }
}
