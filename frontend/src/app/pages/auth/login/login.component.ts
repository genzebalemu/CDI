
import { CountryISO, SearchCountryField,NgxIntlTelInputModule,PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class LoginComponent {
 
  public phoneForm = new FormGroup({
    phone: new FormControl("", [Validators.required])  // Make sure this is the expected control
  });

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  public ngOnInit(): void {
    this.phoneForm.statusChanges.subscribe((status) => {
      console.log('Form Status:', status);
      console.log('Phone Control Value:', this.phoneForm.get('phone')?.value);
    });
  }
}
