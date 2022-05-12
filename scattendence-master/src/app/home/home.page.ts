import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DataService, Location } from '../services/data.service';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  getPostion ;
  locations : Location[]=[];
  itemsCollection: AngularFirestoreCollection <any>;
  items : Observable <any[]>;
  constructor(private geolocation: Geolocation, private dataService: DataService, private cd:ChangeDetectorRef) {
    this.dataService.getLocations().subscribe(res => {
      this.locations = res;
      console.log('location', this.locations)
      this.cd.detectChanges()
    });
  }
  // ionViewWillEnter(){
  //   this.itemsCollection = this.afs.collection('Locations') ;
  //   this.items = this.itemsCollection.valueChanges();
  //   console.log('values',this.items);
  // }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
       console.log('location resp', resp);
       const latitude = resp.coords.latitude;
       const longitude = resp.coords.longitude;
      //  const qrFunc = getData(latitude, longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     this.getPostion = this.geolocation.watchPosition();
     this.getPostion.subscribe((data) => {
      console.log('location data', data);//replace this firebase endpoint
      
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }


}
