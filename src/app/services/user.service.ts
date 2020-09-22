import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { User } from '../models/user';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  user: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private mv: AngularFirestore) {  }

  form = new FormGroup({        
    userName: new FormControl(''),
    userEmail: new FormControl(''),
    userBiography: new FormControl(''),
    userPassword: new FormControl(''),
    userPhone: new FormControl(''),
    userType: new FormControl(''),
    completed: new FormControl(false)
  })

  createUsers(data) {
    return new Promise<any>((resolve, reject) =>{
        this.mv
            .collection("users")
            .add(data)
            .then(res => {}, err => reject(err));
    });
}

updateUser(userKey, value){
  value.nameToSearch = value.name.toLowerCase();
  return this.mv.collection('users').doc(userKey).set(value);
}
  getUsers(){
    return this.user;

  }

  addUser(user: User){
    this.usersCollection.add(user);
  }

  deleteUser(user:User){
    this.userDoc = this.mv.doc('users/${user.id}');
    this.userDoc.delete();
  }
}

