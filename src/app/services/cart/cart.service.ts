import { Injectable } from '@angular/core';
import { Product } from '../product/product.service';
import { BehaviorSubject, Observable } from 'rxjs';
export interface CartItem {
  product: Product;
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);

  addToCart(product: Product, quantity: number) {
    const existingItem = this.cartItems.find(
      (item) => item.product.productId === product.productId
    );
    if (existingItem) {
      existingItem.quantity += quantity; // Increase the quantity if the product exists in the cart
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.updateCartCount();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity > 0) {
      this.cartItems[index].quantity = quantity;
    } else {
      this.removeFromCart(index); // Remove the item if quantity is set to 0
    }
    this.updateCartCount();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.updateCartCount();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  private updateCartCount() {
    const totalItems = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartCountSubject.next(totalItems); // Emit the updated cart count
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.cartItems = [];
    this.cartCountSubject.next(0);
  }

  constructor() {}
}
