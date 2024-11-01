// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../../services/auth.service';
// import { PhoneNumberFormat, SearchCountryField,CountryISO, } from 'ngx-intl-tel-input';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
// import { Router } from '@angular/router';
// interface PhoneNumber {
//   countryCode: string;
//   dialCode: string;
//   e164Number: string;
//   internationalNumber: string;
//   nationalNumber: string;
//   number: string;
// }

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   standalone:true,
//   imports: [NgxIntlTelInputModule, ReactiveFormsModule, CommonModule, FormsModule],

// })
// export class LoginComponent {
//   verificationCode: string = ''; 
//   showVerificationInput: boolean = false; 
//   separateDialCode = false;
//   SearchCountryField = SearchCountryField;
//   CountryISO = CountryISO;
//   PhoneNumberFormat = PhoneNumberFormat;
//   preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

//   public phoneForm: FormGroup;
//   constructor(private authservice: AuthService, private router:Router) {
//     this.phoneForm = new FormGroup({
//       phone: new FormControl<PhoneNumber | null>(null, [Validators.required]),
//     });
//   }

//   onCountryChange(event: any) {
//     const dialCode = event.dialCode; 
//     const currentValue = this.phoneForm.get('phone')?.value;

//     console.log('Country Change Event:', event); 
//     if (typeof currentValue === 'string') {
//       const currentNumber = currentValue.replace(/^\+\d+\s?/, '').trim();
//       this.phoneForm.get('phone')?.setValue(dialCode + ' ' + currentNumber);
//     } else {
//       this.phoneForm.get('phone')?.setValue(dialCode + ' ');
//     }
//   }

//   onLogin() {
//     const phone = this.phoneForm.get('phone')?.value;

//     if (this.phoneForm.valid && phone) {
//       const formattedPhoneNumber = phone.e164Number; 
//       this.authservice.loginStudent(formattedPhoneNumber).subscribe(
//         (response) => {
//           console.log("response", response);
//           // localStorage.setItem("token", response.token)
//           this.router.navigate([''])
//         },
//         (error) => {
//           console.error("Login failed", error);
//         }
//       );
//     } else {
//       console.error("Phone number is required.");
//     }
//   }
// }





import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';
import {Auth,  RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from '@angular/fire/auth';
import { AfterViewInit } from '@angular/core';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { HttpClient } from '@angular/common/http';
import { ReCaptchaV3Service, RecaptchaFormsModule, RecaptchaV3Module } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
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
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, CommonModule, FormsModule]
})
export class LoginComponent {
  auth = inject(Auth);
  http = inject(HttpClient);
  recaptchaVerifier!: RecaptchaVerifier; 
  confirmationResult!: ConfirmationResult;
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


  ngOnInit() {
    // Check if the window is defined to ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      this.initializeRecaptcha();
    }
  }

  initializeRecaptcha() {
        this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
            size: 'invisible', 
            callback: (response: any) => {
                console.log("reCAPTCHA solved, response: ", response);
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired, please revalidate.');
            },
        });
        
        this.recaptchaVerifier.render().then((widgetId) => {
          console.log('Recaptcha initialized with widget ID:', widgetId);
        }).catch((error) => {
          console.error('Error rendering reCAPTCHA:', error);
        });
}


requestOtp() {
  if (this.phoneForm.valid && this.recaptchaVerifier) {
      const phoneNumber = this.phoneForm.value.phone.e164Number;
      console.log('Phone number:', phoneNumber);

      const appVerifier = this.recaptchaVerifier;
      signInWithPhoneNumber(this.auth, phoneNumber, appVerifier)
          .then((result) => {
              this.confirmationResult = result;
              console.log('OTP sent successfully, confirmation result:', this.confirmationResult); 
              this.showVerificationInput = true; 
          })
          .catch((error) => {
              console.error('Error sending OTP:', error);
              if (error.message.includes("verify")) {
                  console.log("RecaptchaVerifier might not be initialized correctly.");
              }
          });
  } else {
      console.log('Phone number is invalid or RecaptchaVerifier is not initialized');
  }
}

  
verifyOtpAndLogin() {
  const { phone } = this.phoneForm.value;
  if (this.verificationCode) {
      this.confirmationResult.confirm(this.verificationCode)
          .then((result) => {
            const uuid = result.user.uid;
              result.user.getIdToken().then((token) => {
                  localStorage.setItem('Token', token);
                  this.authservice.loginStudent(uuid, token).subscribe(
                      (response) => {
                          console.log('Student login successfully:', response);
                          this.router.navigate(['']);
                      },
                      (error) => {
                          if (error.error.code === 11000) {
                              console.error('login failed: Phone number already in use.');
                          } else {
                              console.error('login failed:', error);
                          }
                      }
                  );
              }).catch(error => {
                  console.error('Error fetching token:', error);
              });
          })
          .catch((error) => {
              console.error('Error verifying code:', error);
          });
  } else {
      console.log('Verification code is required');
  }
}

}


