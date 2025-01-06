import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
  }
}
