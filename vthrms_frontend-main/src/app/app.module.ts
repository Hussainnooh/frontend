import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToasterService } from './core/services/toaster/toaster.service';
import { PerformanceReviewService } from './services/performance-review.service'; 
import { HttpClientModule } from '@angular/common/http'; // Import if using HTTP services

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HttpClientModule // Add this if your service uses HttpClient
  ],
  providers: [ToasterService, PerformanceReviewService], // Add your service here
  bootstrap: [AppComponent],
})
export class AppModule {}
