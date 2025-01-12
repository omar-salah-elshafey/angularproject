import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product/product.service';
import { CartItem, CartService } from '../services/cart/cart.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  validateQuantity(quantity: number, stock: number | undefined): number {
    const maxStock = stock ?? 0;
    if (quantity > maxStock) {
      return maxStock;
    } else if (quantity < 1) {
      return 1;
    }
    return quantity;
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  updateQuantity(index: number, quantity: number) {
    const validatedQuantity = this.validateQuantity(
      quantity,
      this.cartItems[index].product.stock
    );
    this.cartItems[index].quantity = validatedQuantity;

    this.cartService.updateQuantity(index, validatedQuantity);
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
