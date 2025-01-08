import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.product = this.productService.getSelectedProduct();
  }
  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert(`${this.product.name} has been added to your cart!`);
    }
  }
}
