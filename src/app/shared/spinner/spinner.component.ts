import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overlay" *ngIf="isLoading$ | async">
      <div class="lds-dual-ring"></div>
  </div>
  ` ,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent  {

  isLoading$ = this.spinnerSvc.isLoading$;

  constructor( private spinnerSvc: SpinnerService ) { }

  
}
