import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Livingroom } from '../../models/livingroom/livingroom.model';
import {  Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  livingroomdata: Livingroom[];
  latestLivingRoomData: Livingroom[];
  refreshTime: Number = 500;
  lightData: any = 0;
  heatingData: any = 0;
  movingsensor: any = 0;

  constructor(
     private apiService: ApiService,
     private http: Http
  ) { }


  getLivingroom(): void {
    this.apiService
        .getLivingroom()
        .subscribe(livingroomdata => this.livingroomdata = livingroomdata);
  }

  getLatestLivingroom(refreshTime): void {
      Observable.interval(refreshTime)
        .switchMap(() => this.http.get('api/latestlivingroom')).map((data) => data.json())
        .subscribe((data) => {
          this.latestLivingRoomData = data; 
          this.movingSensor(data.movingSensor);
           console.log(data);// see console you get output every 5 sec
        });
    }
  
  movingSensor(sensor){
    if(sensor>='17'){
      return 0;
    }
    else{
      return 1;
    }
  };

  toggleLight() {
    this.apiService.toggleLight()
    .subscribe(lightData => this.lightData = lightData);
  }

toggleHeating() {
    this.apiService.toggleHeating()
    .subscribe(heatingData => this.heatingData = heatingData);

  }

  click() {
    this.getLatestLivingroom(this.refreshTime);
    return console.log(this.latestLivingRoomData);
  }

  ngOnInit() {
    this.getLivingroom();
    this.getLatestLivingroom(this.refreshTime);
  }

}
