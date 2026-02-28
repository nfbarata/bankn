import { Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Injectable({providedIn: 'root'})
export class EventsService {
  @Output() banknChange:  EventEmitter<void> = new EventEmitter();
  @Output() accountsChange: EventEmitter<void> = new EventEmitter();
  @Output() accountSelectionChange: EventEmitter<void> = new EventEmitter();
  @Output() accountTransactionsChange: EventEmitter<void> = new EventEmitter();
  @Output() transactionChange: EventEmitter<void> = new EventEmitter();
  @Output() categoriesChange: EventEmitter<void> = new EventEmitter();
  @Output() entitiesChange: EventEmitter<void> = new EventEmitter();
  
  constructor() { }

  public subscribeBanknChange(callback:Function):void{
    console.debug("banknChange subscribed");
    this.banknChange.subscribe(()=>callback);
  }

  public emitBanknChange():void{
    console.debug("banknChange event");
    this.banknChange.emit();
  }

  public emitAccountsChange():void{
    console.debug("accountsChange event");
    this.accountsChange.emit();
  }

  public emitAccountSelectionChange():void{
    console.debug("accountSelectionChange event");
    this.accountSelectionChange.emit();
  }

  public emitAccountTransactionsChange():void{
    console.debug("accountTransactionsChange event");
    this.accountTransactionsChange.emit();
  }

  public emitTransactionChange():void{
    console.debug("transactionChange event");
    this.transactionChange.emit();
  }

  public emitCategoriesChange():void{
    console.debug("categoriesChange event");
    this.categoriesChange.emit();
  }

  public emitEntitiesChange():void{
    console.debug("entitiesChange event");
    this.entitiesChange.emit(); 
  }
}