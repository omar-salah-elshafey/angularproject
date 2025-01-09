import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart/cart.service';
import { FormsModule } from '@angular/forms';
// import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.product = this.productService.getSelectedProduct();
  }
  addToCart() {
    if (this.product && this.quantity > 0) {
      this.cartService.addToCart(this.product, this.quantity);
      alert(
        `${this.product.name} (${this.quantity} pcs) has been added to your cart!`
      );
    }
  }
}
