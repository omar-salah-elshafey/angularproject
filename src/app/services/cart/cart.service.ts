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

  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(product: Product, quantity: number) {
    const existingItem = this.cartItems.find(
      (item) => item.product.productId === product.productId
    );
    const productStock = product.stock ?? 0;
    if (existingItem) {
      const currentQuantity = existingItem.quantity ?? 0;
      const newQuantity = existingItem.quantity + quantity;
      existingItem.quantity =
        newQuantity > productStock ? productStock : newQuantity;
    } else {
      const quantityToAdd = quantity > productStock  ? productStock  : quantity;
      this.cartItems.push({ product, quantity: quantityToAdd });
    }
    this.saveCartToLocalStorage();
    this.updateCartCount();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity > 0) {
      this.cartItems[index].quantity = quantity;
    } else {
      this.removeFromCart(index); // Remove the item if quantity is set to 0
    }
    this.saveCartToLocalStorage();
    this.updateCartCount();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCartToLocalStorage();
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
    this.saveCartToLocalStorage();
    this.cartCountSubject.next(0);
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.updateCartCount();
    }
  }

  removeProductFromCartById(productId: number) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.productId !== productId
    );
    this.saveCartToLocalStorage();
    this.updateCartCount();
  }
}
