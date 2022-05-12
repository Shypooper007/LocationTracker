import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { DataService, Location } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Geolocation } from '@capacitor/geolocation';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  locations : Location[]=[];
  getPostion ;
  lat ;
  lng;

  constructor(private dataService: DataService, private cd:ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController, public ngZone: NgZone) {
    this.dataService.getLocations().subscribe(res => {
      this.locations = res;
      console.log('location', this.locations)
      this.cd.detectChanges()
    })
  }
  async addLocation() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'latitude',
          placeholder: 'latitude',
          type: 'text'
        },
        {
          name: 'longitude',
          placeholder: 'longitude',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.dataService.addLocation({ latitude: res.latitude, longitude: res.longitude });
          }
        }
      ]
    });
 
    await alert.present();
  }
  async openLocation(location: Location) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: location.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }
     printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
    
      console.log('Current position:', coordinates);
    
    
  }
  async getLocation(){
    this.getPostion = Geolocation.watchPosition({}, (position, err) => {
      this.ngZone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.dataService.addLocation({
          'latitude': this.lat,
          'longitude': this.lng
        })
        console.log('lat',this.lat);
        console.log('lng',this.lng);
      })
    })
     
  }

}
