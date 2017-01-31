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
  refreshTime: Number = 5000;


  constructor(
     private http: Http,
     private settingsService: SettingsService
   ) { }

   updateSettings(){
     console.log(this.settings);
     this.settingsService.updateSettings(this.settings).subscribe(settings => this.settings = settings);
     console.log("settings changed");
   }

     getSettings(refreshTime): void {
      Observable.interval(refreshTime)
        .switchMap(() => this.http.get('api/settings')).map((data) => data.json())
        .subscribe((data) => {
          this.settings = data; 
           console.log(data);// see console you get output every 5 sec
        });
    }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(settings => this.settings = settings);
    console.log(this.settings);
  }

}
