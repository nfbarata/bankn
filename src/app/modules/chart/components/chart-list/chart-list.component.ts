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
import Chart from 'chart.js/auto'
import { DineroPipe } from 'src/app/modules/shared/pipes/dinero.pipe';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit, AfterViewInit {
  transactions: Transaction[] = [];
  selectedAccounts: Account[] = [];
  accounts: Account[] = [];
  chart!: Chart<'doughnut', number[], string>;

  @ViewChild('chart', { static: false }) chartReference!: ElementRef;
  form = new UntypedFormGroup({
    groupBy: new UntypedFormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private accountService: AccountService,
    private mathService: MathService,
    private transactionService: TransactionService,
    private dineroPipe: DineroPipe,
  ) {}

  ngOnInit() {

    this.form.setValue({
      groupBy: 'entity'
    });

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
              enabled: false
            },
            /*title: {
              display: true,
              text: 'Transactions' // i18n
            }*/
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

    if(this.chart!=null){
      this.refreshChartData();
    }
  }

  refreshChartData(){

    while(this.chart.data.labels!.length>0){
      this.chart.data.labels!.pop();
    }
    while(this.chart.data.datasets.length>0) {
      this.chart.data.datasets.pop();
    };

    var transactionsBy;
    if(this.form.controls['groupBy'].value == 'entity'){
      transactionsBy = this.transactionService.groupByEntity(this.transactions);
    }else{
      transactionsBy = this.transactionService.groupByCategory(this.transactions);
    }

    if(transactionsBy.size > 0) {

      var usedCurrency = transactionsBy.values().next().value!.toJSON().currency;

      this.chart.data.labels! = Array.from(transactionsBy.keys());
      this.chart.data.datasets.push({data: Array.from(transactionsBy.values()).map((d) => d.toJSON().amount)});
      (this.chart.options.plugins as any).datalabels =  {
            formatter: (value: number, _context: any) => {
              return this.dineroPipe.transform(MathService.toDinero(
                value,
                usedCurrency
              ));
            }
          };
    }
    this.chart.update();
  }
}
