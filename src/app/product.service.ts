import { Injectable } from '@angular/core';
import { Observable, of, from, Observer } from 'rxjs';
import { products } from './product-data';
import { Product } from './product';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  pro: Product[] = [];
  // productObservable?: Observable<Product>;
  productObservable?: Observable<Product[]>;
  constructor() {
    this.pro = products;
  }

  getProducts(sPrice?: number | null, ePrice?: number | null): Observable<Product[]> {
    this.productObservable = of(this.pro);
    if (!sPrice && !ePrice) {
      return this.productObservable;
    }

    return this.productObservable.pipe(
      map((productArray: Product[]) => {
        return productArray.filter((product: Product) => {
          if (ePrice && sPrice) {
            return product.price >= sPrice && product.price <= ePrice;
          }
          if (sPrice) {
            return product.price >= sPrice;
          }

          if (ePrice) {
            return product.price <= ePrice;
          }
          return true;
        });
      })
    );
  }

  /*getProducts(sPrice?: number, ePrice?: number): Observable<Product> {
    // from is used to convert an array to obnserable which can emit the array elements one by one
    this.productObservable = from(this.pro);
    if (!sPrice && !ePrice) {
      return this.productObservable;
    }

    return this.productObservable.pipe(
      filter((product: Product) => {
        if (ePrice && sPrice) {
          return product.price >= sPrice && product.price <= ePrice;
        }

        if (sPrice) {
          return product.price >= sPrice;
        }

        if (ePrice) {
          return product.price <= ePrice;
        }
        return true;
      })
    );
  } */
}
