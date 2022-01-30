import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavService } from 'src/app/services/fav.service';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  searchKey:string = "";
  public filterCategory:any;

  constructor(private api : ApiService, private cartServie: CartService, private favService: FavService ) {
    
  }

  ngOnInit(): void {

    this.api.getProduct()
      .subscribe( resp => {

        this.productList = resp;
        console.log(resp);
        
        this.filterCategory = resp;
        this.productList.forEach ((a: any) => {
          if ( a.category === "women's clothing" || a.category === "men's clothing" ) {
            a.category = "fashion"
          }
          Object.assign( a, { quantity:1, total:a.price } )
        });
        
      })

    this.cartServie.search.subscribe(  (val:any) => {
      this.searchKey = val;
    }) 

  }

  addtocart( item:any){
    this.cartServie.addtoCart(item);
  }

  addtofav(item:any){
    this.favService.addtoFav(item);
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter(  (a:any) => {
      if ( a.category == category || category == '' ) {
        return a;
      }
    })  
  }
 
}
