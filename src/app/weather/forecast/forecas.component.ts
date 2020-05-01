import { Component, OnInit } from '@angular/core';
import {ForecastService} from '../forecast.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-forecas',
  templateUrl: './forecas.component.html',
  styleUrls: ['./forecas.component.css']
})
export class ForecasComponent implements OnInit {
forecast$: Observable<{ dateString: string; temp: number }[]>;
  constructor(private forecastService: ForecastService) {
    this.forecast$ = forecastService.getForecast();
  }

  ngOnInit(): void {
  }

}
