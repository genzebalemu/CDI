import { Component } from '@angular/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [NgxIntlTelInputModule, FormsModule], // Ensure both modules are included here
  templateUrl: './register-student.component.html'
})
export class RegisterStudentComponent {
  phoneNumber: string = ''; // Bind this to your phone input
  hasError: boolean = false; // Track error status

  // Method to handle errors
  handleError(event: boolean) {
    this.hasError = event;
  }

  // Method to get the output number
  getNumber(event: any) {
    console.log('Phone Number:', event); // You can handle the phone number here
  }

  // Method to get the TelInput object
  telInputObject(event: any) {
    console.log('TelInput Object:', event); // You can work with the input object here
  }

  // Method to handle country change
  onCountryChange(event: any) {
    console.log('Country changed:', event); // Handle the country change event
  }
}
