import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, filter, map, mergeMap, pluck, retry, share, switchMap, tap, toArray} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NotificationsService} from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    }
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
 private url = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(private http: HttpClient, private notificationsService: NotificationsService) {
  }

  getForecast() {
    return this.getCurrentLocation().pipe(
      map(coords => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', '3f617abb72599388ec262809b5d17fbf');
      }),
      switchMap(params => this.http.get<OpenWeatherResponse>(this.url, {params})),
      pluck('list'),
      mergeMap(value => of(...value)),
      filter((value, index) => index % 8 === 0),
      map(value => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp
        };
      }),
      toArray(),
      share()
    );
  }

  getCurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      console.log('Trying to get Location');
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(5),
      tap(() => {
        this.notificationsService.addSuccess('Got Your Location');
      }), catchError((err) => {
        // 1 Handle the  error
        this.notificationsService.addError('Failed to get your location');
        // Return new observable
        return throwError(err);
        })
    );
  }
}
