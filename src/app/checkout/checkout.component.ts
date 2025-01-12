import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../services/product/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  // Shipping Details
  name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  placeOrder() {
    if (!this.name || !this.email || !this.address || !this.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    if (!this.isValidEmail(this.email) || !this.isValidPhone(this.phone)) {
      alert('Please enter a valid email and phone number.');
      return;
    }

    // Update stock for each product
    this.cartItems.forEach((item) => {
      if (item.product.stock !== undefined) {
        item.product.stock -= item.quantity;
      }
    });

    this.saveUpdatedStockToLocalStorage();

    // Simulate order placement
    alert('Order placed successfully!');
    this.cartService.clearCart();
    this.router.navigate(['/products']);
  }

  saveUpdatedStockToLocalStorage() {
    // Assuming you have a list of products stored in localStorage as 'products'
    const updatedProducts = this.cartItems.map((item) => item.product);

    // Get existing products from localStorage (if any)
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');

    // Update the stock in the stored products array
    updatedProducts.forEach((updatedProduct) => {
      const index = storedProducts.findIndex(
        (product: Product) => product.productId === updatedProduct.productId
      );
      if (index !== -1) {
        storedProducts[index].stock = updatedProduct.stock;
      }
    });

    // Save the updated products back to localStorage
    localStorage.setItem('products', JSON.stringify(storedProducts));
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    return phoneRegex.test(phone);
  }
}
