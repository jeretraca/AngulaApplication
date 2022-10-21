import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "../services/product.service";
import { IProduct } from "./product";

@Component({
   
   templateUrl: './product-list.component.html',
   styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product List";
  imageWidth:number = 50;
  imageMargin: number =2;
  showImage: boolean = false;
  errorMessage: string = " ";
  sub! : Subscription
  private _listFilter: string = " ";

  filteredProducts: IProduct[] = [];

  products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      console.log('In setter: ', value);
      this.filteredProducts = this.performFilter(value);
  }



  onRatingClicked(message: string):void{
    this.pageTitle = "Product List: " + message;
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
    product.productName.toLowerCase().includes(filterBy) );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit():void{
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
     this.sub.unsubscribe();
  }

}
