import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
 
export interface Location {
  id?: string;
  latitude: string;
  longitude: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private firestore: Firestore) { }
 
  getLocations(): Observable<Location[]> {
    const locationsRef = collection(this.firestore, 'Locations');
    return collectionData(locationsRef, { idField: 'id'}) as Observable<Location[]>;
  }
 
  getLocationById(id): Observable<Location> {
    const locationDocRef = doc(this.firestore, `Locations/${id}`);
    return docData(locationDocRef, { idField: 'id' }) as Observable<Location>;
  }
 
  addLocation(location: Location) {
    const locationsRef = collection(this.firestore, 'Locations');
    return addDoc(locationsRef, location);
  }
 
  deleteLocation(location: Location) {
    const locationDocRef = doc(this.firestore, `Locations/${location.id}`);
    return deleteDoc(locationDocRef);
  }
 
  updateLocation(location: Location) {
    const locationDocRef = doc(this.firestore, `Locations/${location.id}`);
    return updateDoc(locationDocRef, { latitude: location.latitude, longitude: location.longitude });
  }
}