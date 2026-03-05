import { Routes } from '@angular/router';

import { InitializedGuard } from "../../guards/initialized.guard";
import { BanknComponent } from "./bankn.component";

export const BANKN_ROUTES: Routes = [
  { path: "", component: BanknComponent },
  {
    path: "current",
    component: BanknComponent,
    canActivate: [InitializedGuard]
  },
]