import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  cartCount: number = 0;
  private cartCountSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartCountSubscription = this.cartService
      .getCartCount()
      .subscribe((count) => {
        this.cartCount = count;
      });
  }
  ngOnDestroy(): void {
    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }
  }
}
