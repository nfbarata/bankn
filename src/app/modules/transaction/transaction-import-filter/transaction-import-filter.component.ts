import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Directive,
  ViewEncapsulation,
  Renderer2,
  Inject
} from "@angular/core";
import { Location, DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EventsService } from "../../../services/events.service";
import { BanknService } from "../../../services/bankn.service";
import { AccountService } from "../../../services/account.service";
import { TransactionService } from "../../../services/transaction.service";
import { Account } from "../../../models/account";
import {
  Transaction,
  TransactionType,
  getTransactionType,
  ImportColumnType,
  getImportColumnType
} from "../../../models/transaction";

@Component({
  selector: "app-transaction-import-filter",
  templateUrl: "./transaction-import-filter.component.html",
  styleUrls: ["./transaction-import-filter.component.css"]
})
export class TransactionImportFilterComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  formData;
  account: Account;
  transactions;
  document;
  importColumnType = Object.entries(ImportColumnType);

  @ViewChild("submitHelpBlock", { static: false }) submitHelpBlock: ElementRef;

  constructor(
    private renderer: Renderer2,
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(DOCUMENT) document
  ) {
    this.document = document;
    this.formData = {
      importData: null
    };
    this.form = this.formBuilder.group(this.formData);
  }
  ngAfterViewInit(): void {
    /**if(this.transactions.length>0){
      this.clearTable();
      this.fillTable(this.transactions);
    }*/
  }
  ngOnInit() {
    this.account = null;
    this.transactions = this.transactionService.importTransactions;
    this.route.paramMap.subscribe(params => {
      var accountId = params.get("accountId");
      this.account = this.accountService.getAccount(accountId);
      if (this.account == null) {
        this.router.navigate([""]);
      }
      if (this.transactions.length == 0) {
        alert("No transactions to import"); //i18n
        this.router.navigate(["/transactions/import/" + this.account.getId()]);
      }
    });
  }

  private getDate(value) {
    value = value.replace("/", "-");
    value = value.split("-");
    return value;
  }

  private getNumber(value): number {
    return Number(value.replace(",", "."));
  }

  private getYear(value) {
    if (value.length == 4) return value;
    if (value > 80)
      //TODO
      return "19" + value;
    else return "20" + value;
  }

  onSubmit(data) {
    this.transactionService.filterActions = [];
    this.transactions[0].forEach((column, index) => {
      var action = this.document.getElementById("action" + index);
      this.transactionService.filterActions.push(action.value);
    });

    this.transactionService.filterTransactions = [];
    try {
      this.transactions.forEach((row, i) => {
        var dontIgnore = this.document.getElementById("dontIgnore" + i);
        if (dontIgnore.checked) {
          var amount: number = null;
          var date: Date = null;
          var description: string = null;
          var type = TransactionType.CREDIT;

          this.transactions[0].forEach((column, j) => {
            var value = row[j];
            switch (
              getImportColumnType(this.transactionService.filterActions[j])
            ) {
              case ImportColumnType.IGNORE:
                break;
              case ImportColumnType.DESCRIPTION:
                description = value;
                break;
              case ImportColumnType.DATE_DMY:
                value = this.getDate(value);
                date = new Date(this.getYear(value[2]), value[1] - 1, value[0]);
                break;
              case ImportColumnType.DATE_MDY:
                value = this.getDate(value);
                date = new Date(this.getYear(value[2]), value[0] - 1, value[1]);
                break;
              case ImportColumnType.DATE_YMD:
                value = this.getDate(value);
                date = new Date(this.getYear(value[0]), value[1] - 1, value[2]);
                break;
              case ImportColumnType.AMOUNT:
                if (value.includes("-")) {
                  value = value.replace("-", "");
                  type = TransactionType.DEBIT;
                }
                amount = this.getNumber(value);
                break;
              case ImportColumnType.CREDIT:
                amount = this.getNumber(value);
                break;
              case ImportColumnType.DEBIT:
                amount = this.getNumber(value);
                type = TransactionType.DEBIT;
                break;
              case ImportColumnType.SIGN:
                if (value.trim() == "-") type = TransactionType.DEBIT;
                break;
            }
          });

          if (amount == null || date == null || description == null) {
            throw new Error(
              "There should be at least a column for amount, date and description"
            );
          }
          this.transactionService.filterTransactions.push(
            new Transaction(
              null,
              this.accountService.toDinero(
                this.accountService.getCurrency(this.account),
                amount
              ),
              date,
              null,
              null,
              description,
              type
            )
          );
        }
      });
    } catch (error) {
      this.setMessage(error);
      return;
    }
    this.form.reset();
    this.router.navigate(["/transactions/import-edit/" + this.account.getId()]);
  }

  setMessage(message: string) {
    this.renderer.setProperty(
      this.submitHelpBlock.nativeElement,
      "innerHTML",
      message
    );
  }

  /*clearTable(){
    //this.renderer.setProperty(this.parsedData.nativeElement, 'innerHTML',""); 
  }*/

  /*fillTable(data){
    var headerRow = this.renderer.createElement('tr');
    this.renderer.appendChild(this.parsedData.nativeElement, headerRow);
    
    var headerCheckbox = this.renderer.createElement('th');
    this.renderer.setProperty(headerCheckbox, 'innerHTML',"Import?");
    
    this.renderer.appendChild(headerRow, headerCheckbox);
    
    data[0].forEach(column=>{
        var headerCell = this.renderer.createElement('th');
      
        var select = this.renderer.createElement('select');
        this.renderer.addClass(select, "form-control");
      
        this.renderer.appendChild(headerCell, select);
      
        this.renderer.appendChild(headerRow, headerCell);
    });    
    
    var i = 0;
    data.forEach((row, index)=>{
      
      var htmlRow = this.renderer.createElement('tr');
      this.renderer.appendChild(this.parsedData.nativeElement, htmlRow);

      var htmlCheckBoxCell = this.renderer.createElement('td');
      this.renderer.appendChild(htmlRow, htmlCheckBoxCell);
      
      var htmlCheckboxDiv = this.renderer.createElement('div');
      this.renderer.addClass(htmlCheckboxDiv, "custom-control");
      this.renderer.addClass(htmlCheckboxDiv, "custom-checkbox");
      this.renderer.addClass(htmlCheckboxDiv, "text-center");

      var htmlCheckbox = this.renderer.createElement('input');
      this.renderer.setProperty(htmlCheckbox, 'id',"checkbox"+index);
      this.renderer.setProperty(htmlCheckbox, 'type',"checkbox");
      this.renderer.setProperty(htmlCheckbox, 'checked',"true");
      this.renderer.addClass(htmlCheckbox, "custom-control-input");
      
      var htmlCheckboxLabel = this.renderer.createElement('label');
      this.renderer.setAttribute(htmlCheckboxLabel, 'for',"checkbox"+index);
      this.renderer.addClass(htmlCheckboxLabel, "custom-control-label");
      
      this.renderer.appendChild(htmlCheckboxDiv, htmlCheckbox);
      this.renderer.appendChild(htmlCheckboxDiv, htmlCheckboxLabel);
      
      this.renderer.appendChild(htmlCheckBoxCell, htmlCheckboxDiv);
      
      row.forEach(column=>{
        var htmlCell = this.renderer.createElement('td');
        this.renderer.appendChild(htmlRow, htmlCell);
        this.renderer.setProperty(htmlCell, 'innerHTML',column);
      });
    });
  }*/
}
