import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { Settings } from '../../models/settings/settings.model';
import {  Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  settings: Settings[];
  refreshTime: Number = 1000;


  constructor(
     private http: Http) { }


     getSettings(refreshTime): void {
      Observable.interval(0)
        .switchMap(() => this.http.get('api/settings')).map((data) => data.json())
        .subscribe((data) => {
          this.settings = data; 
           console.log(data);// see console you get output every 5 sec
        });
    }

  ngOnInit() {
    this.getSettings(this.refreshTime);
  }

}
