import { Component, OnInit } from '@angular/core';
import { FavService } from '../../services/fav.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss']
})
export class FavComponent implements OnInit {

  public products: any = [];

  constructor(private favService:FavService) { 
    
  }

  ngOnInit(): void {
    this.favService.getProducts()
    .subscribe( resp =>{
      
      this.products = resp;

      if (localStorage.getItem('productosfav') ) {
        this.products =  JSON.parse(localStorage.getItem('productosfav')!)
      }
      
    })
  }

  removerItem(item:any){
    this.favService.removeCartItem(item);
    if (localStorage.getItem('productosfav') ) {
      this.products =  JSON.parse(localStorage.getItem('productosfav')!)
    }
  }

  emtyfav(){
    this.favService.removeAllCart();
    if (localStorage.getItem('productosfav') ) {
      this.products =  JSON.parse(localStorage.getItem('productosfav')!)
    }
  }

}
