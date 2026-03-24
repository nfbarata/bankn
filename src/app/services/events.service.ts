import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

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

  public subscribeBanknChange(callback: () => void): Subscription {
    console.debug("banknChange subscribed");
    return this.banknChange.subscribe(callback);
  }

  public emitBanknChange(): void {
    //console.debug("banknChange event");
    this.banknChange.next();
  }

  public subscribeAccountsChange(callback: () => void): Subscription {
    console.debug("accountsChange subscribed");
    return this.accountsChange.subscribe(callback);
  }

  public emitAccountsChange(): void {
    //console.debug("accountsChange event");
    this.accountsChange.next();
  }

  public subscribeAccountSelectionChange(callback: () => void): Subscription {
    console.debug("accountSelectionChange subscribed");
    return this.accountSelectionChange.subscribe(callback);
  }

  public emitAccountSelectionChange(): void {
    //console.debug("accountSelectionChange event");
    this.accountSelectionChange.next();
  }

  public subscribeAccountTransactionsChange(callback: () => void): Subscription {
    console.debug("accountTransactionsChange subscribed");
    return this.accountTransactionsChange.subscribe(callback);
  }

  public emitAccountTransactionsChange(): void {
    //console.debug("accountTransactionsChange event");
    this.accountTransactionsChange.next();
  }

  public subscribeTransactionChange(callback: () => void): Subscription {
    console.debug("transactionChange subscribed");
    return this.transactionChange.subscribe(callback);
  }

  public emitTransactionChange(): void {
    //console.debug("transactionChange event");
    this.transactionChange.next();
  }

  public subscribeCategoriesChange(callback: () => void): Subscription {
    console.debug("categoriesChange subscribed");
    return this.categoriesChange.subscribe(callback);
  }

  public emitCategoriesChange(): void {
    //console.debug("categoriesChange event");
    this.categoriesChange.next();
  }

  public subscribeEntitiesChange(callback: () => void): Subscription {
    console.debug("entitiesChange subscribed");
    return this.entitiesChange.subscribe(callback);
  }

  public emitEntitiesChange(): void {
    //console.debug("entitiesChange event");
    this.entitiesChange.next();
  }

  public subscribeTransactionPeriodChange(callback: () => void): Subscription {
    console.debug("transactionPeriodChange subscribed");
    return this.transactionPeriodChange.subscribe(callback);
  }

  public emitTransactionPeriodChange(): void {
    //console.debug("transactionPeriodChange event");
    this.transactionPeriodChange.next();
  }
}