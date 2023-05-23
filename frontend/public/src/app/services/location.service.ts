import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  reverseGeocode(lat: number, lng: number): Observable<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=<AIzaSyCNONcBvTi3KSEi6ucGRLX4GNBYWfzP0Og>`;

    return this.http.get(url).pipe(
      map((response: any) => {
        const addressComponents = response.results[0].address_components;
        let address = '';
        for (let i = 0; i < addressComponents.length; i++) {
          const component = addressComponents[i];
          if (component.types.includes('street_number')) {
            address += component.long_name + ', ';
          } else if (component.types.includes('route')) {
            address += component.long_name;
          }
        }
        return address;
      })
    );
  }
  getCurrentLocation(): Observable<LatLngLiteral>{
    return new Observable((observer) => {
      if(!navigator.geolocation) return;

      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        (error) => {
          observer.error(error);
        }
      )
    })
  }
}
