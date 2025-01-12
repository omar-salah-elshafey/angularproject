import { Injectable } from '@angular/core';
import { CartService } from '../cart/cart.service';

export interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  stock: number;
  featured: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      productId: 1,
      name: 'Samsung S23 Ultra',
      image: 'assets/img/samS23Ultra.jpg',
      price: 999,
      description:
        'A powerful smartphone with a 108MP camera, 5000mAh battery, and 12GB RAM.',
      stock: 10,
      featured: true,
    },
    {
      productId: 2,
      name: 'Iphone 14 plus',
      image: 'assets/img/ip14plus.jpg',
      price: 999,
      description:
        'The iPhone 14 Plus offers a larger display and enhanced battery life, along with the powerful A16 Bionic chip.',
      stock: 5,
      featured: true,
    },
    {
      productId: 3,
      name: 'Huawei Nova Y70',
      image: 'assets/img/huaweinovaY70.jpg',
      price: 600,
      description:
        'The Huawei Nova Y70 features a sleek design, a powerful Kirin processor, and an advanced camera system.',
      stock: 15,
      featured: true,
    },
    {
      productId: 4,
      name: 'Oppo Reno 8 pro',
      image: 'assets/img/opporeno8pro.jpg',
      price: 1499,
      description:
        'The Oppo Reno 8 Pro features a high-end Snapdragon processor, 120Hz AMOLED display, and an impressive quad-camera setup.',
      stock: 8,
      featured: true,
    },
    {
      productId: 5,
      name: 'Realme 11 pro plus',
      image: 'assets/img/realme11proplus.jpg',
      price: 699,
      description:
        'The Realme 11 Pro Plus offers a 108MP camera, 5000mAh battery, and 8GB RAM, making it a great choice for photography enthusiasts.',
      stock: 12,
      featured: true,
    },
    {
      productId: 6,
      name: 'Xiaomi 13 Pro',
      image: 'assets/img/Xiaomi13Pro.jpg',
      price: 499,
      description: 'Details of Xiaomi 13 Pro can be added here.',
      stock: 20,
      featured: false,
    },
    {
      productId: 7,
      name: 'Samsung Tab S8 Ultra',
      image: 'assets/img/samTabS8Ultra.jpg',
      price: 1299,
      description:
        'The Samsung Tab S8 Ultra features a stunning 14.6-inch Super AMOLED display, Snapdragon 8 Gen 1 processor, and up to 12GB of RAM for unparalleled performance.',
      stock: 10,
      featured: false,
    },
    {
      productId: 8,
      name: 'Ipad 12 Pro 6',
      image: 'assets/img/ipad12pro6.jpg',
      price: 1199,
      description:
        'The iPad 12 Pro 6 features a 12.9-inch Liquid Retina XDR display, M1 chip, and up to 1TB of storage for professional-grade performance and creativity.',
      stock: 5,
      featured: false,
    },
    {
      productId: 9,
      name: 'Apple Watch Ultra',
      image: 'assets/img/applewatchultra.jpg',
      price: 799,
      description:
        'The Apple Watch Ultra is built for extreme adventures with a rugged titanium case, a brighter display, a new Action button, and longer battery life.',
      stock: 8,
      featured: false,
    },
    {
      productId: 10,
      name: 'Samsung Watch 5',
      image: 'assets/img/samWatch5.jpg',
      price: 279,
      description:
        'The Samsung Watch 5 offers advanced health and fitness tracking, a rotating bezel, and a durable design.',
      stock: 15,
      featured: false,
    },
    {
      productId: 11,
      name: 'Huawei Watch GT 3',
      image: 'assets/img/HUAWEIWATCHGT3.jpg',
      price: 199,
      description:
        'The Huawei Watch GT 3 is a stylish and long-lasting smartwatch with advanced health and fitness tracking features.',
      stock: 20,
      featured: false,
    },
    {
      productId: 12,
      name: 'Xiaomi Smart Band 7',
      image: 'assets/img/XiaomiSmartBand7.jpg',
      price: 49,
      description:
        'The Xiaomi Smart Band 7 is a budget-friendly fitness tracker with a large AMOLED display and comprehensive health and fitness tracking features.',
      stock: 30,
      featured: false,
    },
    {
      productId: 13,
      name: 'Huawei FreeBuds 5',
      image: 'assets/img/HUAWEIFreeBuds5.jpg',
      price: 199,
      description:
        'Open-fit design for comfortable and immersive sound. Intelligent Dynamic Audio Adjustment for personalized listening.',
      stock: 25,
      featured: false,
    },
    {
      productId: 14,
      name: 'Xiaomi Redmi Buds 4 Pro',
      image: 'assets/img/RedmiBuds4Pro.jpg',
      price: 70,
      description:
        'High-fidelity audio with active noise cancellation and long battery life. Comfortable and secure fit.',
      stock: 35,
      featured: false,
    },
  ];

  constructor(private cartService: CartService) {
    this.initializeProducts();
  }
  private initializeProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      this.saveProductsToStorage(); // Save the hardcoded products initially.
    }
  }
  loadProductsFromStorage() {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  saveProductsToStorage() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private selectedProduct: Product | null = null;

  getProducts(): Product[] {
    return this.products;
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter((product) => product.featured);
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  getSelectedProduct(): Product | null {
    return this.selectedProduct;
  }

  addProduct(product: Product): void {
    const newProductId = this.products.length
      ? Math.max(...this.products.map((p) => p.productId)) + 1
      : 1;
    this.products.push({ ...product, productId: newProductId });
    this.saveProductsToStorage();
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(
      (p) => p.productId === updatedProduct.productId
    );
    if (index !== -1) {
      this.products[index] = { ...updatedProduct };
    }
    this.saveProductsToStorage();
  }

  deleteProduct(productId: number): void {
    this.products = this.products.filter(
      (product) => product.productId !== productId
    );
    this.saveProductsToStorage();
    this.cartService.removeProductFromCartById(productId);
  }
}
