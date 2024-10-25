import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// import 'zone.js';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { provideAnimations } from '@angular/platform-browser/animations'; // Import the provideAnimations function

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [provideAnimations()] // Include the provideAnimations() in the providers
// })
//   .catch((err) => console.error(err));
