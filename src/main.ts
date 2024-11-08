import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Use provideHttpClient instead

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Use provideHttpClient instead of importProvidersFrom(HttpClientModule)
    // other providers if needed
  ]
})
.catch(err => console.error(err));
