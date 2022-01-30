import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  theme:Theme =  'light-theme';

  public totalItem: any = 0;
  public searchTerm: string = '';
  

  constructor(  private cartServie: CartService , @Inject(DOCUMENT) private document: Document, private renderer :Renderer2  ) {

   
    if (localStorage.getItem('theme') ) {
      this.theme =  JSON.parse(localStorage.getItem('theme')!)
    }

   }

  ngOnInit(): void {
    this.cartServie.getProducts()
    .subscribe((resp:any) =>{
      this.totalItem = resp.length;
          
    })

    this.initialTheme();
 
  }

  switchTheme(){
    this.document.body.classList.replace(
      this.theme, this.theme === 'light-theme' 
      ? (this.theme = 'dark-theme') 
      : (this.theme = 'light-theme') 
    );

    localStorage.setItem('theme',JSON.stringify(this.theme))
  }

  search(event:any){
    this.searchTerm = ( event.target as HTMLInputElement ).value;
    // console.log(this.searchTerm);
    this.cartServie.search.next(this.searchTerm);
  }


  initialTheme = ():void => 
     this.renderer.addClass(this.document.body, this.theme)

     

}

export type Theme = 'light-theme' | 'dark-theme';