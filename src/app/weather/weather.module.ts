import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecasComponent } from './forecast/forecas.component';



@NgModule({
  declarations: [ForecasComponent],
  exports: [
    ForecasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WeatherModule { }
