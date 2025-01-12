import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Product,
  ProductService,
} from '../../services/product/product.service';

@Component({
  selector: 'app-featured-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}
  featuredProducts: Product[] = [];
  ngOnInit(): void {
    this.featuredProducts = this.productService.getFeaturedProducts();
  }
}
