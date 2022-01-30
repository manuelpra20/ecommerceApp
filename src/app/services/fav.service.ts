import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  
  public cartItemList:any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private toastrSvc: ToastrService) {
     
    if (localStorage.getItem('productosfav') ) {
      this.cartItemList =  JSON.parse(localStorage.getItem('productosfav')!)
    }
  }

  getProducts(){
    return this.productList.asObservable();
   }

   setProduct( product: any ){
    this.cartItemList.push( ...product );
    this.productList.next(product);
  }

  addtoFav(product: any){
    
    this.cartItemList.push( product );
    
    this.productList.next(this.cartItemList);

    this.toastrSvc.success(`SE AÑADIÓ ${product.title } A FAVORITOS.` , 'MPStoreApp',{timeOut: 2000})
    
    localStorage.setItem('productosfav',JSON.stringify(this.cartItemList))
    
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index: any) => {
      if ( product.id === a.id ) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
    localStorage.setItem('productosfav',JSON.stringify(this.cartItemList))
    this.toastrSvc.success( `SE ELIMINO  ${product.title } DE FAVORITOS.`, 'MPStoreApp', {timeOut: 2000})
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    localStorage.setItem('productosfav',JSON.stringify(this.cartItemList))
    this.toastrSvc.success('SE ELIMINARION TODOS LOS PRODUCTOS DE FAVORITOS.', 'MPStoreApp', {timeOut: 2000})
  }

}
