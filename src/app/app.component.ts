import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { Product } from './product';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  productSubscription!: Subscription;
  productForm!: FormGroup;
  sPrice?: number | null;
  ePrice?: number | null;

  productsArray: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    /*
    this.productSubscription = this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.productsArray = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('done');
      }
    ); */

    this.productForm = new FormGroup({
      'startingPrice' :  new FormControl(null),
      'endingPrice' : new FormControl(null),
    });

    this.applyFilter();

    this.productForm.valueChanges.subscribe((data) => {
      console.log(data);
      this.sPrice = Number(data.startingPrice) ? Number(data.startingPrice) : null;
      this.ePrice = Number(data.endingPrice) ? Number(data.endingPrice) : null;
      if(this.productSubscription){
        this.productSubscription.unsubscribe();
      }
      this.applyFilter();
    });

    

    
  }

  applyFilter(){
    this.productSubscription = this.productService.getProducts(this.sPrice, this.ePrice).subscribe({
      next: (data: Product[]) => {
        this.productsArray = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed')
      }
    });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
