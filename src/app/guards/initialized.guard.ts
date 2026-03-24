import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BanknService } from '../services/bankn.service';

@Injectable({
  providedIn: 'root'
})
export class InitializedGuard  {
  private router = inject(Router);
  private banknService = inject(BanknService);
 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.banknService.initialized()){
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
