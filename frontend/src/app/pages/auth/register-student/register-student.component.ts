

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

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule, RecaptchaFormsModule, RecaptchaV3Module, CommonModule, FormsModule],
  templateUrl: './register-student.component.html'
})
export class RegisterStudentComponent implements OnInit{
  auth = inject(Auth);
  http = inject(HttpClient);
  registerForm: FormGroup;
  recaptchaVerifier!: RecaptchaVerifier; 
  confirmationResult!: ConfirmationResult;
  basicURL = 'https://cdiwork.com:8082/v1/api';
  url = '/student';
  verificationCode: string = ''; 
  showVerificationInput: boolean = false; 
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor(private fb: FormBuilder, private authservice:AuthService, private router:Router) {
    this.registerForm = this.fb.group({
      uuid: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      city: ['Addis Ababa', Validators.required],
      gender: ['Male', Validators.required],
      country: ['Ethiopia', Validators.required],
      account_created_with_email: true
    });
  }

  onCountryChange(event: any) {
    const dialCode = event.dialCode; 
    const currentValue = this.registerForm.get('phoneNumber')?.value;

    console.log('Country Change Event:', event); 
    if (typeof currentValue === 'string') {
      const currentNumber = currentValue.replace(/^\+\d+\s?/, '').trim();
      this.registerForm.get('phoneNumber')?.setValue(dialCode + ' ' + currentNumber);
    } else {
      this.registerForm.get('phoneNumber')?.setValue(dialCode + ' ');
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
    if (this.registerForm.valid) {
        const appVerifier = this.recaptchaVerifier;
        const phoneNumber = this.registerForm.value.phoneNumber.e164Number;
        console.log(phoneNumber)
        signInWithPhoneNumber(this.auth, phoneNumber, appVerifier)
            .then((result) => {
                this.confirmationResult = result;
                console.log('OTP sent successfully, confirmation result:', this.confirmationResult); 
                this.showVerificationInput = true; 
            })
            .catch((error) => {
                console.error('Error sending OTP:', error);
            });
    } else {
        console.log('Phone number is invalid');
    }
}

  
verifyOtp() {
  const { phoneNumber, fullName, city, country, gender, email, account_created_with_email } = this.registerForm.value;

  if (this.verificationCode) {
      this.confirmationResult.confirm(this.verificationCode)
          .then((result) => {
              const uuid = result.user.uid;
              result.user.getIdToken().then((token) => {
                  const studentData = {
                      uuid: uuid,
                      city,
                      country,
                      gender,
                      full_name: fullName,
                      phone: phoneNumber.e164Number,
                      email,
                      account_created_with_email
                  };

                  localStorage.setItem('authToken', token);
                  this.authservice.registerStudent(studentData, token).subscribe(
                      (response) => {
                          console.log('Student registered successfully:', response);
                          this.router.navigate(['/login']);
                      },
                      (error) => {
                          if (error.error.code === 11000) {
                              console.error('Registration failed: Phone number already in use.');
                              alert('This phone number is already registered. Please use a different number.');
                          } else {
                              console.error('Registration failed:', error);
                              alert('An error occurred during registration. Please try again.');
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