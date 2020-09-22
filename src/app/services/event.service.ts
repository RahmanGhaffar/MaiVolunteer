import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Event } from '../models/event';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})



export class EventService {
  eventsCollection: AngularFirestoreCollection<Event>;
  event: Observable<Event[]>;
  eventDoc: AngularFirestoreDocument<Event>;

  constructor(public mv: AngularFirestore) 
  
  {

    this.eventsCollection = this.mv.collection('events');
    // display data - firebase
    // this.event=this.mv.collection('event').valueChanges();

    // find ID
    this.event = this.eventsCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(a =>{
        const data = a.payload.doc.data() as Event;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getEvents(){
    return this.event;

  }

  addEvent(event: Event){
    this.eventsCollection.add(event);
  }

  deleteEvent(event:Event){
    this.eventDoc = this.mv.doc('events/${event.id}');
    this.eventDoc.delete();
  }

  listEventbyID(string:string){
    this.eventsCollection.doc(string).ref.get().then(function(doc){
      return doc.data();
    })
  }

  getEvent(node) {
    return this.mv.doc<Event>('events/' + node).valueChanges();
 }

}
