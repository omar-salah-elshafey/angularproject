import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-management',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss',
})
export class ProductManagementComponent {
  products: Product[] = [];

  newProduct: Product = {
    productId: 0,
    name: '',
    price: 0,
    description: '',
    stock: 0,
    featured: false,
  };

  editedProduct: Product = {
    productId: 0,
    name: '',
    price: 0,
    description: '',
    stock: 0,
    featured: false,
  };

  isEditing: boolean = false;

  newImage: File | null = null;
  editedImage: File | null = null;

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  handleImageChange(event: Event, isEditing: boolean = false) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (isEditing && this.editedProduct) {
          this.editedProduct.image = reader.result as string;
        } else {
          this.newProduct.image = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
    if (isEditing) {
      this.editedImage = file;
    } else {
      this.newImage = file;
    }
  }

  addProduct() {
    if (
      this.newProduct.name &&
      this.newProduct.price &&
      this.newProduct.stock !== undefined
    ) {
      this.productService.addProduct(this.newProduct);
      this.resetForm();
      this.loadProducts();
    }
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.editedProduct = { ...product };
    this.editedImage = null;
  }

  updateProduct() {
    if (this.editedProduct) {
      this.productService.updateProduct(this.editedProduct);
      this.cancelEdit();
      this.loadProducts();
    }
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
    this.loadProducts();
  }

  cancelEdit() {
    this.isEditing = false;

    this.editedImage = null;

    this.editedProduct = {
      productId: 0,
      name: '',
      price: 0,
      description: '',
      image: '',
      stock: 0,
      featured: false,
    };
  }

  resetForm() {
    this.newProduct = {
      productId: 0,
      name: '',
      price: 0,
      description: '',
      stock: 0,
      featured: false,
    };
    this.newImage = null;
  }
}
