import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Directive, ViewEncapsulation, Renderer2 } from '@angular/core';
import { Location} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { BanknService } from '../../../services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { Account } from "../../../models/account";
import { Transaction, TransactionType, getTransactionType } from "../../../models/transaction";

@Component({
  selector: 'transaction-import',
  templateUrl: './transaction-import.component.html',
  styleUrls: ['./transaction-import.component.css'],
 // encapsulation: ViewEncapsulation.None
})
export class TransactionImportComponent implements OnInit, AfterViewInit {
  submitDisabled: boolean=true;
  text = '';
  @ViewChild('importData',{static:false}) importData:ElementRef;
  @ViewChild('columnSeparator',{static:false}) columnSeparator:ElementRef;
  @ViewChild('lineSeparator',{static:false}) lineSeparator:ElementRef;
  @ViewChild('parsedData',{static:false}) parsedData:ElementRef;
  @ViewChild('submitHelpBlock',{static:false}) submitHelpBlock:ElementRef;

  form;
  formData;

  constructor(
    private renderer: Renderer2,
    private eventsService: EventsService,
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { 
    this.formData = {
      importData:null,
      columnSeparator:"&#9;",
      lineSeparator:"&#10;"
    }
    this.form = this.formBuilder.group(this.formData);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      var accountId = params.get('accountId');
    });
  }

  onSubmit(data) {

    this.form.reset();
    this.router.navigate(['/transactions']);
  }

  setMessage(message:string){
    this.renderer.setProperty(this.submitHelpBlock.nativeElement, 'innerHTML', message);
  }

  onInputChange(){
    this.clearTable();
    var data = this.importData.nativeElement.value;
    var lines = data.split(this.lineSeparator.nativeElement.value);
    if(lines.length>0 && lines[0].trim().length>0){
      var firstColumn = lines[0].split(this.columnSeparator.nativeElement.value);
      var parsedData = [];
      if(firstColumn.length>3){
        for(var i=0; i!=lines.length;i++){
          var columns = lines[i].split(this.columnSeparator.nativeElement.value);
          if(columns.length!=firstColumn.length){
            this.setMessage('There should be at least 3 columns');
            this.submitDisabled = true;
            return;    
          }
          parsedData.push(columns);
        }
        this.setMessage('Check the data below before import');
        this.fillTable(parsedData);
        this.submitDisabled = false;
      }else{
        this.setMessage('There should be at least 3 columns');
        this.submitDisabled = true;
      }
    }else{
      this.setMessage('Enter some text');
      this.submitDisabled = true;
    } 
  }

  clearTable(){
    this.renderer.setProperty(this.parsedData.nativeElement, 'innerHTML',""); 
  }

  fillTable(data){
    console.log(data);
    data.forEach(row=>{
      var htmlRow = this.renderer.createElement('tr');
      this.renderer.appendChild(this.parsedData.nativeElement, htmlRow);
      row.forEach(column=>{
        var htmlCell = this.renderer.createElement('td');
        this.renderer.appendChild(htmlRow, htmlCell);
        this.renderer.setProperty(htmlCell, 'innerHTML',column);
      });
    });
 //this.parsedData
/*
const h1 = this.renderer.createElement('h1');
    const text = this.renderer.createText('Hello world');

    this.renderer.appendChild(h1, text);
    this.renderer.appendChild(this.el.nativeElement, div);
*/
  }
}