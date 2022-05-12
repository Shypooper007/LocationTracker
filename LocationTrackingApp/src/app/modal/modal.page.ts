import { Component, Input, OnInit } from '@angular/core';
import { Location, DataService } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';
 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  location: Location = null;
 
  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }
 
  ngOnInit() {
    this.dataService.getLocationById(this.id).subscribe(res => {
      this.location = res;
    });
  }
 
  async deleteLocation() {
    await this.dataService.deleteLocation(this.location)
    this.modalCtrl.dismiss();
  }
 
  async updateLocation() {
    await this.dataService.updateLocation(this.location);
    const toast = await this.toastCtrl.create({
      message: 'Location updated!.',
      duration: 2000
    });
    toast.present();
 
  }
}