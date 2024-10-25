
// import { Component, OnInit, inject } from '@angular/core';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
// import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// import { Auth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from '@angular/fire/auth';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-register-student',
//   standalone: true,
//   imports: [NgxIntlTelInputModule, ReactiveFormsModule],
//   templateUrl: './register-student.component.html'
// })
// export class RegisterStudentComponent implements OnInit {
//   registerForm: FormGroup;
//   recaptchaVerifier!: RecaptchaVerifier; 
//   confirmationResult!: ConfirmationResult;
//   auth: Auth; // Declare Auth variable
//   basicURL = 'https://cdiwork.com:8082/v1/api';
//   url = '/student';

//   constructor(private http: HttpClient) {
//     // Use inject() inside the constructor
//     this.auth = inject(Auth); // Initialize Firebase Auth here

//     // Initialize the reactive form
//     this.registerForm = new FormGroup({
//       uuid: new FormControl(''),
//       fullName: new FormControl('', [Validators.required]),
//       email: new FormControl('', [Validators.required, Validators.email]),
//       phoneNumber: new FormControl('', [Validators.required]), // Phone input from ngx-intl-tel-input
//       city: new FormControl('Addis Ababa', [Validators.required]),
//       gender: new FormControl('Male', [Validators.required]),
//       country: new FormControl('Ethiopia', Validators.required)
//     });
//   }

//   ngOnInit() {
//     // this.initializeRecaptcha();
//   }

//   // initializeRecaptcha() {
//   //   this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, this.auth);
//   //   this.recaptchaVerifier.render(); // Ensure reCAPTCHA is rendered
//   // }

//   onRegister() {
//     if (this.registerForm.valid) {
//       const { phoneNumber, fullName, city, country, gender, email } = this.registerForm.value;

//       // Ensure that the phone number is formatted correctly
//       const formattedPhoneNumber = phoneNumber.e164Number;

//       signInWithPhoneNumber(this.auth, formattedPhoneNumber, this.recaptchaVerifier)
//         .then((result) => {
//           this.confirmationResult = result;

//           // Prompt for the verification code
//           const verificationCode = prompt('Enter the verification code sent to your phone');
//           if (verificationCode) {
//             return this.confirmationResult.confirm(verificationCode);
//           } else {
//             throw new Error('Verification code not provided');
//           }
//         })
//         .then((userCredentials) => {
//           const uuid = userCredentials.user?.uid;
//           this.registerForm.patchValue({ uuid }); // Update the form with the user's UUID

//           const studentData = {
//             uuid,
//             city,
//             country,
//             gender,
//             full_name: fullName,
//             phone: formattedPhoneNumber,
//             email
//           };

//           console.log(studentData);

//           // Send the registration data to the backend
//           this.http.post(`${this.basicURL}${this.url}`, studentData).subscribe({
//             next: (response: any) => {
//               console.log('Student created successfully', response);
//             },
//             error: (error) => {
//               console.error('Error creating student', error);
//             }
//           });
//         })
//         .catch((error) => {
//           console.error('Error during phone authentication:', error);
//         });
//     }
//   }
// }


import { Component, OnInit, inject } from '@angular/core';
import { NgxIntlTelInputModule, SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [NgxIntlTelInputModule, ReactiveFormsModule],
  templateUrl: './register-student.component.html',
})


export class RegisterStudentComponent implements OnInit {
  private auth= inject(Auth)
  private http=inject(HttpClient)
  registerForm: FormGroup;
  recaptchaVerifier!: RecaptchaVerifier; 
  
  confirmationResult!: ConfirmationResult;
  basicURL = 'https://cdiwork.com:8082/v1/api';
  url = '/student';
  verificationCode: string = ''; // For inputting verification code
  showVerificationInput: boolean = false; // Toggle for verification code input
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  
  constructor() {
    this.registerForm = new FormGroup({
      uuid: new FormControl(''),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]) ,// Phone input from ngx-intl-tel-input
      city: new FormControl('Addis Ababa', [Validators.required]),
      gender: new FormControl('Male', [Validators.required]),
      country: new FormControl('Ethiopia', Validators.required)
    });
  }

  ngOnInit() {
    // if (typeof window !== 'undefined') { // Ensure it's in the browser
    //   this.initializeRecaptcha();
    // } else {
    //   console.error('Recaptcha cannot be initialized in this environment');
    // }
  }
  
  // initializeRecaptcha() {
  //   if (typeof window !== 'undefined') { // Check if we are in the browser
  //     this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', {
  //       size: 'normal',
  //       callback: (response: any) => {
  //         console.log("Recaptcha verified:", response);
  //       }
  //     });
  
  //     this.recaptchaVerifier.render()
  //       .then(() => {
  //         console.log("Recaptcha rendered successfully");
  //       })
  //       .catch((error) => {
  //         console.error('Error rendering Recaptcha:', error);
  //       });
  //   } else {
  //     console.error('Recaptcha cannot be initialized in this environment');
  //   }
  // }
  
  

  onRegister() {
    console.log("register")
    // if (this.registerForm.valid) {
    //   const { phoneNumber, fullName, city, country, gender, email } = this.registerForm.value

    //   signInWithPhoneNumber(this.auth, this.phoneNumber, this.recaptchaVerifier)
    //     .then((result) => {
    //       this.confirmationResult = result;
    //       this.showVerificationInput = true; 
    //     })
    //     .catch((error) => {
    //       console.error('Error during phone authentication:', error);
    //     });
    // }
  }

  verifyCode() {
    const { city, country, gender, fullName, phoneNumber, email } = this.registerForm.value;
    const formattedPhoneNumber = phoneNumber.e164Number; // Format the phone number
    console.log(formattedPhoneNumber)
    if (this.verificationCode) {
      this.confirmationResult.confirm(this.verificationCode)
        .then((userCredentials) => {
          const uuid = userCredentials.user?.uid;
          this.registerForm.patchValue({ uuid }); // Update the form with the user's UUID

          const studentData = {
            uuid,
            city,
            country,
            gender,
            full_name: fullName,
            phone: formattedPhoneNumber,
            email
          };

          console.log(studentData);

          // Send the registration data to the backend
          this.http.post(`${this.basicURL}${this.url}`, studentData).subscribe({
            next: (response: any) => {
              console.log('Student created successfully', response);
            },
            error: (error) => {
              console.error('Error creating student', error);
            }
          });
        })
        .catch((error) => {
          console.error('Error verifying code:', error);
        });
    } else {
      console.error('Verification code not provided');
    }
  }
}




