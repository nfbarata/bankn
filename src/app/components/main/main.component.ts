import { ApplicationRef, Component, OnInit, inject } from '@angular/core';
import { BanknService } from '../../services/bankn.service';
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';
import { MenuComponent } from './main-menu.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';
import { FooterComponent } from './main-footer.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
import { filter, first, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    imports: [MenuComponent, RouterOutlet, FileUploadComponent, FooterComponent]
})
export class MainComponent implements OnInit {
  private library = inject(FaIconLibrary);
  private banknService = inject(BanknService);
  private eventsService = inject(EventsService);
  private accountService = inject(AccountService);
  private appRef = inject(ApplicationRef);
  private router = inject(Router);

  hasBankn: Boolean = false;
  hasAccounts: Boolean = false;

  ngOnInit() {
    this.eventsService.subscribeBanknChange(() => this.refreshData());
    this.eventsService.subscribeAccountsChange(() => this.refreshData());

    this.library.addIcons(
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faStackOverflow,
      faGithub,
      faMedium
    );
    this.router.events.pipe(
          filter(e => e instanceof NavigationEnd),
          first(),
          switchMap(() => this.appRef.isStable.pipe(filter(x => x), first()))
        ).subscribe(() => {
          setTimeout(() => this.onAppReady()); // ensure post-render
        });
    
    this.refreshData();
  }

  refreshData() {
    this.hasBankn = this.banknService.initialized();
    this.hasAccounts = this.accountService.getAccounts().length > 0;
  }

  onOpen() {
    this.banknService.loadFromFile();
    this.router.navigate(['']);
  }

  onAppReady() {
    if (!environment.production && environment.exampleFile) {
      console.log("initializing with test data");
      fetch(environment.exampleFile)
        .then(response => response.json())
        .then(data => {
          this.banknService.setBankn(BanknService.fromJson(data));
        })
        .catch(error => console.error('Error loading example file:', error));
    }
  }
}
