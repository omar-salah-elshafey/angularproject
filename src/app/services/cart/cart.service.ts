import { Injectable } from '@angular/core';
import { Product } from '../product/product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];

  addToCart(product: Product) {
    this.cartItems.push(product);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, product) => total + product.price, 0);
  }

  clearCart() {
    this.cartItems = [];
  }
  constructor() {}
}
