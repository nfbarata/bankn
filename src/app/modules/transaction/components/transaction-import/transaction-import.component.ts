import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Location } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../../services/events.service';
import { BanknService } from '../../../../services/bankn.service';
import { AccountService } from '../../../../services/account.service';
import { TransactionService } from '../../../../services/transaction.service';

@Component({
  selector: 'transaction-import',
  templateUrl: './transaction-import.component.html',
  styleUrls: ['./transaction-import.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class TransactionImportComponent implements OnInit, AfterViewInit {
  submitDisabled: boolean = true;
  @ViewChild('importData', { static: false }) importData!: ElementRef;
  @ViewChild('columnSeparator', { static: false }) columnSeparator!: ElementRef;
  @ViewChild('lineSeparator', { static: false }) lineSeparator!: ElementRef;
  @ViewChild('customColumnSeparator', { static: false })
  customColumnSeparator!: ElementRef;
  @ViewChild('customLineSeparator', { static: false })
  customLineSeparator!: ElementRef;
  @ViewChild('parsedData', { static: false }) parsedData!: ElementRef;
  @ViewChild('submitHelpBlock', { static: false }) submitHelpBlock!: ElementRef;

  form: UntypedFormGroup;
  formData;
  accountId: string | null = null;
  output: any;

  constructor(
    private renderer: Renderer2,
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    //https://www.rapidtables.com/web/html/html-codes.html
    this.formData = {
      importData: null,
      columnSeparator: '9',
      lineSeparator: '10',
      customColumnSeparator: '',
      customLineSeparator: '',
    };
    this.form = this.formBuilder.group(this.formData);
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.transactionService.importTransactions = [];
    this.route.paramMap.subscribe((params) => {
      this.accountId = params.get('accountId');
    });
  }

  onSubmit(data: any) {
    this.transactionService.importTransactions = this.output;
    this.form.reset();
    this.router.navigate(['/transactions/import-filter/' + this.accountId]);
  }

  setMessage(message: string) {
    this.renderer.setProperty(
      this.submitHelpBlock.nativeElement,
      'innerHTML',
      message
    );
  }

  onInputChange() {
    this.clearTable();
    this.submitDisabled = true;

    var lineSeparator;
    var columnSeparator;
    if (this.lineSeparator.nativeElement.value == '') {
      lineSeparator = this.customLineSeparator.nativeElement.value;
      if (lineSeparator.trim().length == 0) {
        this.setMessage('Insert some value at row separator');
        return;
      }
    } else {
      lineSeparator = String.fromCharCode(
        this.lineSeparator.nativeElement.value
      );
    }
    if (this.columnSeparator.nativeElement.value == '') {
      columnSeparator = this.customColumnSeparator.nativeElement.value;
      if (columnSeparator.trim().length == 0) {
        this.setMessage('Insert some value at column separator');
        return;
      }
    } else {
      columnSeparator = String.fromCharCode(
        this.columnSeparator.nativeElement.value
      );
    }

    try {
      var result = this.transactionService.parse(
        this.importData.nativeElement.value,
        lineSeparator,
        columnSeparator
      );
      this.setMessage('Check the data below before import'); //i18n
      this.fillTable(result);
      this.submitDisabled = false;
    } catch (error: any) {
      this.setMessage(error);
    }
  }

  clearTable() {
    this.output = null;
    this.renderer.setProperty(this.parsedData.nativeElement, 'innerHTML', '');
  }

  fillTable(data: string[][]) {
    this.output = data;
    data.forEach((row) => {
      var htmlRow = this.renderer.createElement('tr');
      this.renderer.appendChild(this.parsedData.nativeElement, htmlRow);
      row.forEach((column) => {
        var htmlCell = this.renderer.createElement('td');
        this.renderer.appendChild(htmlRow, htmlCell);
        this.renderer.setProperty(htmlCell, 'innerHTML', column);
      });
    });
  }
}
