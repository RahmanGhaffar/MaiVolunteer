import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event, EventId } from '../../models/event';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Timestamp } from '@firebase/firestore-types';

export interface activityDetails{
  eventName:string;
  eventDate:string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'] 
})



export class DetailsComponent implements OnInit {

  


  events: Event[];
  eventID$:BehaviorSubject<String>;
  eventRef:AngularFirestoreCollection<Event>;
  event$:Observable<Event[]>;


  dateCreated$:BehaviorSubject<Date>;
  @Input()
  event: Event;
  myEvent: Event;

  //EventInfo
  venue:string;
  date:Date;
  dateCreated:Timestamp;
  info:string;
  name: string;
  numberNeeded:number;
  picID:[""];
  userID:string;
  imageUrl:string;

  //userID
  userName: string;
  userEmail:String;
  userBio:string;

  activity:Array<any> = [];

  


  public activityId;
  constructor(
    private route:ActivatedRoute,
    private mv:AngularFirestore,
    private eventService:EventService,  
  ) {
    let id =this.route.snapshot.paramMap.get('id');
    this.activityId = id;

    // this.mv.collection('events').doc('E0001').ref.get().then(function(doc) {
    //   if (doc.exists){
    //     console.log(doc.data());
    //     this.event =doc.data();
    //   }
    // })
  }
  
  ngOnInit() {

    console.log(localStorage.getItem('uid'));
    this.eventService.getEvents
    this.eventRef=this.mv.collection('events');
    // this.event$=this.eventRef.valueChanges();
    
    

    // get single event document
    let myRef = this.mv.doc('events/'+this.activityId);
    myRef.get().subscribe(d=>{
      this.name=d.get('name');
      this.venue=d.get('venue');
      this.date=new Date(d.get('activitydate'));
      this.info=d.get('information');
      this.numberNeeded=d.get('numberNeeded');
      this.picID=d.get('picID');
      this.userID=d.get('userID');
      this.getUser(this.userID);
      this.imageUrl=d.get('imageUrl');
    })
    
  }
  
  // get single User Data
  getUser(uid:string){
    let userRef = this.mv.doc('user/'+uid);
    userRef.get().subscribe(d=>{
      // console.log(d.data());
      this.userName=d.get('name');
      this.userEmail = d.get('email');
      this.userBio = d.get('biography');
    })
  }

  addActivity(){
    let myReference = this.mv.doc('users/'+ localStorage.getItem('uid'));
    myReference.get().subscribe(d=>{
      let c=d.data()
      // console.log('c',c);
      if(!c.activityList){
        c.activityList = [];
      }
      c.activityList.push(localStorage.getItem('uid'));
      console.log(this.name);
      let activityDetail={name:this.name, id:this.activityId};
      console.log(activityDetail);
      if(!this.activity){
        this.activity = [];
      }
      this.activity.push(activityDetail);

     return myReference.update({activityJoined: this.activity})
     
  })
  alert("activity successfully added");
  }
}
