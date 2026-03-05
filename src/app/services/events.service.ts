import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private banknChange: Subject<void> = new Subject<void>();
  private accountsChange: Subject<void> = new Subject<void>();
  private accountSelectionChange: Subject<void> = new Subject<void>();
  private accountTransactionsChange: Subject<void> = new Subject<void>();
  private transactionChange: Subject<void> = new Subject<void>();
  private categoriesChange: Subject<void> = new Subject<void>();
  private entitiesChange: Subject<void> = new Subject<void>();
  private transactionPeriodChange: Subject<void> = new Subject<void>();

  public subscribeBanknChange(callback: () => void): void {
    console.debug("banknChange subscribed");
    this.banknChange.subscribe(callback);
  }

  public emitBanknChange(): void {
    //console.debug("banknChange event");
    this.banknChange.next();
  }

  public subscribeAccountsChange(callback: () => void): void {
    console.debug("accountsChange subscribed");
    this.accountsChange.subscribe(callback);
  }

  public emitAccountsChange(): void {
    //console.debug("accountsChange event");
    this.accountsChange.next();
  }

  public subscribeAccountSelectionChange(callback: () => void): void {
    console.debug("accountSelectionChange subscribed");
    this.accountSelectionChange.subscribe(callback);
  }

  public emitAccountSelectionChange(): void {
    //console.debug("accountSelectionChange event");
    this.accountSelectionChange.next();
  }

  public subscribeAccountTransactionsChange(callback: () => void): void {
    console.debug("accountTransactionsChange subscribed");
    this.accountTransactionsChange.subscribe(callback);
  }

  public emitAccountTransactionsChange(): void {
    //console.debug("accountTransactionsChange event");
    this.accountTransactionsChange.next();
  }

  public subscribeTransactionChange(callback: () => void): void {
    console.debug("transactionChange subscribed");
    this.transactionChange.subscribe(callback);
  }

  public emitTransactionChange(): void {
    //console.debug("transactionChange event");
    this.transactionChange.next();
  }

  public subscribeCategoriesChange(callback: () => void): void {
    console.debug("categoriesChange subscribed");
    this.categoriesChange.subscribe(callback);
  }

  public emitCategoriesChange(): void {
    //console.debug("categoriesChange event");
    this.categoriesChange.next();
  }

  public subscribeEntitiesChange(callback: () => void): void {
    console.debug("entitiesChange subscribed");
    this.entitiesChange.subscribe(callback);
  }

  public emitEntitiesChange(): void {
    //console.debug("entitiesChange event");
    this.entitiesChange.next();
  }

  public subscribeTransactionPeriodChange(callback: () => void): void {
    console.debug("transactionPeriodChange subscribed");
    this.transactionPeriodChange.subscribe(callback);
  }

  public emitTransactionPeriodChange(): void {
    //console.debug("transactionPeriodChange event");
    this.transactionPeriodChange.next();
  }
}