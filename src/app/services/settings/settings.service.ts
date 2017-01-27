import { Injectable } from '@angular/core';
import {  Http, Response, Headers, RequestOptions } from '@angular/http';
import { Settings } from '../../models/settings/settings.model';
import {Observable} from 'rxjs/Rx';


import 'rxjs/add/operator/toPromise';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SettingsService {

  constructor(private http: Http) { }

  private settingsUrl = '/api/settings';


  updateSettings (body: Object): Observable<Settings[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.settingsUrl}/${body['id']}`, body, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    getSettings(): Observable<Settings[]> {
    return this.http.get(this.settingsUrl)
               .map((res:Response) => res.json())
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
