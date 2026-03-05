import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  inject,
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
  standalone: false
})
export class TransactionImportComponent implements OnInit {

  private renderer = inject(Renderer2);
  private transactionService = inject(TransactionService);
  private formBuilder = inject(UntypedFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


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

  formData = {
    importData: null,
    columnSeparator: '9',
    lineSeparator: '10',
    customColumnSeparator: '',
    customLineSeparator: '',
  };
  form: UntypedFormGroup = this.formBuilder.group(this.formData);
  accountId: string | null = null;
  output: any;

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
        var divCell = this.renderer.createElement('div');
        this.renderer.appendChild(htmlRow, htmlCell);
        this.renderer.appendChild(htmlCell, divCell);
        this.renderer.setProperty(divCell, 'innerHTML', column);
        this.renderer.addClass(divCell, 'content-wrapper');
        this.renderer.addClass(divCell, 'fw-light');
        this.renderer.addClass(divCell, 'lh-1');
      });
    });
  }
}
