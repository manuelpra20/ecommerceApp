import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal ! : number;

  constructor( private cartServie: CartService ) { 

      
   

  }

  ngOnInit(): void {
    this.cartServie.getProducts()
    .subscribe( resp =>{
      this.products = resp;
      this.grandTotal = this.cartServie.getTotalPrice()

      console.log(this.products);

      
    if (localStorage.getItem('productos') ) {
      this.products =  JSON.parse(localStorage.getItem('productos')!)
    }
     
      
      
    })
  }

  removeItem(item:any){
    this.cartServie.removeCartItem(item);
    if (localStorage.getItem('productos') ) {
      this.products =  JSON.parse(localStorage.getItem('productos')!)
    }
  }

  emtycart(){
    this.cartServie.removeAllCart();
    if (localStorage.getItem('productos') ) {
      this.products =  JSON.parse(localStorage.getItem('productos')!)
    }
  }

}
