import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'Smartphone A', price: 599 },
    { id: 2, name: 'Tablet B', price: 799 },
    { id: 3, name: 'Smartwatch C', price: 199 },
  ];
}
