import { Component, OnInit } from '@angular/core';
import { HelperService } from '../chat-new/services/helper/helper.service';
import { ApiService } from '../chat-new/services/api/api.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import "./profile.js";
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Timestamp } from 'rxjs/internal/operators/timestamp';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // userInfo
  name:string;
  phone:string;
  type:string;
  email:string;
  password:string;
  biography:string;
  activity:Array<any>;
  activityDate:Date;

  formTemplate =new FormGroup({
    name:new FormControl(''),
    phone:new FormControl(''),
    type:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    biography:new FormControl(''),
  })


  item: any;
  users: Array<any>;
  constructor(
    private route: ActivatedRoute,
     private router: Router,
    public api: ApiService,
    public UserService:UserService,
    public mv:AngularFirestore
  ) { }
  Users = [];
  ngOnInit(){
    
    let myRef = this.mv.doc('users/'+localStorage.getItem('uid'));
    myRef.get().subscribe(d=>{
      this.name=d.get('name');
      this.phone=d.get('phone');
      this.type=d.get('type');
      this.email=d.get('email');
      this.password=d.get('password');
      this.biography=d.get('biography');
      this.activity=d.get('activityJoined');


    })

    


    

    this.getAllUsers() // start by populating the users list.
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    })
    
    
    
  }

  // Run at the start to populate the list.
  getAllUsers() {
    this.api.setCurrentUser(localStorage.getItem('uid')) //setting up the uid in the service for easy access.
    this.api.getUsers().pipe(
      map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data();
          let id = a.payload.doc.id;
          return {...data}
        })
      })
    )
}

  showActivity(){
    console.log("activity", this.activity);
  }

  onSubmit(formValue) {
            this.api.updateUser(localStorage.getItem('uid'), formValue);
            alert("Profile successfully updated");
  }

  toChat(){
    this.router.navigate(['/dashboard'])
  }

  // Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  onSelect(activity){
    this.router.navigate(['/activity',activity.id]);
  }

}

