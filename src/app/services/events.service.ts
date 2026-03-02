import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private banknChange: EventEmitter<void> = new EventEmitter();
  private accountsChange: EventEmitter<void> = new EventEmitter();
  private accountSelectionChange: EventEmitter<void> = new EventEmitter();
  private accountTransactionsChange: EventEmitter<void> = new EventEmitter();
  private transactionChange: EventEmitter<void> = new EventEmitter();
  private categoriesChange: EventEmitter<void> = new EventEmitter();
  private entitiesChange: EventEmitter<void> = new EventEmitter();
  private transactionPeriodChange: EventEmitter<void> = new EventEmitter();

  constructor() { }

  public subscribeBanknChange(callback: () => void): void {
    console.debug("banknChange subscribed");
    this.banknChange.subscribe(callback);
  }

  public emitBanknChange(): void {
    console.debug("banknChange event");
    this.banknChange.emit();
  }

  public subscribeAccountsChange(callback: () => void): void {
    console.debug("accountsChange subscribed");
    this.accountsChange.subscribe(callback);
  }

  public emitAccountsChange(): void {
    console.debug("accountsChange event");
    this.accountsChange.emit();
  }

  public subscribeAccountSelectionChange(callback: () => void): void {
    console.debug("accountSelectionChange subscribed");
    this.accountSelectionChange.subscribe(callback);
  }

  public emitAccountSelectionChange(): void {
    console.debug("accountSelectionChange event");
    this.accountSelectionChange.emit();
  }

  public subscribeAccountTransactionsChange(callback: () => void): void {
    console.debug("accountTransactionsChange subscribed");
    this.accountTransactionsChange.subscribe(callback);
  }

  public emitAccountTransactionsChange(): void {
    console.debug("accountTransactionsChange event");
    this.accountTransactionsChange.emit();
  }

  public subscribeTransactionChange(callback: () => void): void {
    console.debug("transactionChange subscribed");
    this.transactionChange.subscribe(callback);
  }

  public emitTransactionChange(): void {
    console.debug("transactionChange event");
    this.transactionChange.emit();
  }

  public subscribeCategoriesChange(callback: () => void): void {
    console.debug("categoriesChange subscribed");
    this.categoriesChange.subscribe(callback);
  }

  public emitCategoriesChange(): void {
    console.debug("categoriesChange event");
    this.categoriesChange.emit();
  }

  public subscribeEntitiesChange(callback: () => void): void {
    console.debug("entitiesChange subscribed");
    this.entitiesChange.subscribe(callback);
  }

  public emitEntitiesChange(): void {
    console.debug("entitiesChange event");
    this.entitiesChange.emit();
  }

  public subscribeTransactionPeriodChange(callback: () => void): void {
    console.debug("transactionPeriodChange subscribed");
    this.transactionPeriodChange.subscribe(callback);
  }

  public emitTransactionPeriodChange(): void {
    console.debug("transactionPeriodChange event");
    this.transactionPeriodChange.emit();
  }
}