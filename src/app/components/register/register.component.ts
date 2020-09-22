import { Component, OnInit } from '@angular/core';
import { Signup } from 'src/app/models/signup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signupUser(name, gender, email, password, repassword, phone, type){
    let signup: Signup = new Signup (name.value, gender.value,email.value,password.value, repassword.value, phone.value, type.value );
    console.log(signup);
  }

}


// name:string,
//     gender:string,
//     email:string,
//     password:string,
//     repassword:string,
//     phone:string,
//     type:string