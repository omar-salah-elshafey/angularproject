import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-products',
  imports: [CommonModule],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent {
  phones = [
    {
      image: 'assets/images/huaweinovaY70.jpg',
      name: 'Huawei Nova Y70',
      price: 600,
    },
    {
      image: '../../../assets/images/ip13promax.jpg',
      name: 'iPhone 13 Pro Max',
      price: 999,
    },
    {
      image: '../../../assets/images/samS23Ultra.jpg',
      name: 'Samsung S23 Ultra',
      price: 999,
    },
    {
      image: '../../../assets/images/realme11proplus.jpg',
      name: 'Realme 11 Pro Plus',
      price: 699,
    },
    {
      image: '../../../assets/images/opporeno8pro.jpg',
      name: 'Oppo Reno 8 Pro',
      price: 1499,
    },
    {
      image: '../../../assets/images/Xiaomi13Pro.jpg',
      name: 'Xiaomi 13 Pro',
      price: 1499,
    },
  ];

  tablets = [
    {
      image: './../../assets/images/ipad12pro6.jpg',
      name: 'iPad 12 Pro 6',
      price: 1600,
    },
    {
      image: '../../../assets/images/samTabS8Ultra.jpg',
      name: 'Samsung Tab S8 Ultra',
      price: 1999,
    },
  ];
}
