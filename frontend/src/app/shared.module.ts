import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  imports: [
    FormsModule,
    NgxIntlTelInputModule // Import here
  ],
  exports: [
    FormsModule,
    NgxIntlTelInputModule // Export here for use in other modules
  ]
})
export class SharedModule { }
