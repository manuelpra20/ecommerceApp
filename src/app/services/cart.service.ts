import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList:any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  
  constructor( private toastrSvc: ToastrService) { 
    
    if (localStorage.getItem('productos') ) {
         this.cartItemList =  JSON.parse(localStorage.getItem('productos')!)
       }
    
  }

  getProducts(){
   return this.productList.asObservable();
  }

  setProduct( product: any ){
    this.cartItemList.push( ...product );
    this.productList.next(product);
  }

  addtoCart(product: any){
    
    this.cartItemList.push( product );
    this.productList.next(this.cartItemList);
    this.toastrSvc.success(`SE AÑADIÓ ${product.title } AL CARRITO.` , 'MPStoreApp',{timeOut: 2000})
    this.getTotalPrice();
    console.log(this.cartItemList);

    localStorage.setItem('productos',JSON.stringify(this.cartItemList))
   
  }

  getTotalPrice(): number{
    let grandTotal = 0;
    this.cartItemList.map((a:any) => {
      grandTotal += a.total;
    })
    return grandTotal;
    
  }  

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index: any) => {
      if ( product.id === a.id ) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
    localStorage.setItem('productos',JSON.stringify(this.cartItemList))
    this.toastrSvc.success( `SE ELIMINO  ${product.title } DEL CARRITO.`, 'MPStoreApp', {timeOut: 2000})
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    localStorage.setItem('productos',JSON.stringify(this.cartItemList))
    this.toastrSvc.success('SE ELIMINARION TODOS LOS PRODUCTOS DEL CARRITO.', 'MPStoreApp', {timeOut: 2000})
  }

}

