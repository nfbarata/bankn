import { Component, OnInit, inject } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UtilsService } from "../../../../services/utils.service";
import { BanknService } from "../../../../services/bankn.service";

@Component({
    selector: "bankn",
    templateUrl: "./bankn.component.html",
    styleUrls: ["./bankn.component.css"],
    imports: [FormsModule, ReactiveFormsModule]
})
export class BanknComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly banknService = inject(BanknService);
  private readonly utilsService = inject(UtilsService);
  private readonly route = inject(ActivatedRoute);
  
  countries: any;//used on UI
  form = new UntypedFormGroup({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(),
    referenceCountry: new UntypedFormControl()
  });

  constructor() {
    this.countries = this.utilsService.getCountries();
  }

  ngOnInit() {
    if(this.router.url.endsWith("/current")){
      var bankn = this.banknService.getBankn();
      if(bankn!=null){
        this.form.setValue({
          id: bankn.id,
          name: bankn.name,
          referenceCountry: bankn.referenceCountry
        });
      }
    }else{
      this.form.controls["name"].setValue("bankn");
      this.form.controls["referenceCountry"].setValue(this.banknService.getDefaultCountryCode());
    }
  }

  onSubmit() {
    if (this.form.controls["id"].value == null) {
      this.banknService.setBankn(
        BanknService.createBankn(
          this.form.controls["name"].value, 
          this.form.controls["referenceCountry"].value
        )
      );
      this.router.navigate(["/accounts/account"]);
    } else {
      this.banknService.update(
        this.form.controls["name"].value, 
        this.form.controls["referenceCountry"].value
      );
      this.router.navigate([""]);
    }
    this.form.reset();
  }
}