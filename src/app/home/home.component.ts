import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    LandingComponent,
    FeaturedProductsComponent,
    PromoBannerComponent,
    TestimonialsComponent,
    NewsletterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
