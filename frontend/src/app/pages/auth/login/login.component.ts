import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { PhoneNumberFormat, SearchCountryField,CountryISO, } from 'ngx-intl-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
// Define the PhoneNumber interface
interface PhoneNumber {
  countryCode: string;
  dialCode: string;
  e164Number: string;
  internationalNumber: string;
  nationalNumber: string;
  number: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, CommonModule, FormsModule],

})
export class LoginComponent {
  verificationCode: string = ''; 
  showVerificationInput: boolean = false; 
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  public phoneForm: FormGroup;
  constructor(private authservice: AuthService, private router:Router) {
    this.phoneForm = new FormGroup({
      phone: new FormControl<PhoneNumber | null>(null, [Validators.required]),
    });
  }

  onCountryChange(event: any) {
    const dialCode = event.dialCode; 
    const currentValue = this.phoneForm.get('phone')?.value;

    console.log('Country Change Event:', event); 
    if (typeof currentValue === 'string') {
      const currentNumber = currentValue.replace(/^\+\d+\s?/, '').trim();
      this.phoneForm.get('phone')?.setValue(dialCode + ' ' + currentNumber);
    } else {
      this.phoneForm.get('phone')?.setValue(dialCode + ' ');
    }
  }

  onLogin() {
    const phone = this.phoneForm.get('phone')?.value;

    if (this.phoneForm.valid && phone) {
      const formattedPhoneNumber = phone.e164Number; 
      this.authservice.loginStudent(formattedPhoneNumber).subscribe(
        (response) => {
          console.log("response", response);
          // localStorage.setItem("token", response.token)
          this.router.navigate([''])
        },
        (error) => {
          console.error("Login failed", error);
        }
      );
    } else {
      console.error("Phone number is required.");
    }
  }
}
