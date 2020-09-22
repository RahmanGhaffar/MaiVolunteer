import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  addressFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(private api:ApiService,private helper:HelperService,private router:Router, private auth:AuthService) { }

  ngOnInit() {
  }

  register() {
    if (!this.nameFormControl.valid) {
      alert('Please enter Name')
      this.nameFormControl.reset()
      return
    }
    if (!this.emailFormControl.valid) {
      alert('Please enter correct email')
      this.emailFormControl.reset()
      return
    }

    if (!this.passwordFormControl.valid) {
      alert('Please enter correct password format')
      this.passwordFormControl.reset()
      return
    }

    if (!this.addressFormControl.valid) {
      alert('Please enter address')
      this.addressFormControl.reset()
      return

    }
    // console.log('name', this.nameFormControl.value)
    // console.log('email', this.emailFormControl.value)
    // console.log('pass', this.passwordFormControl.value)

    this.auth.signup(this.emailFormControl.value, this.passwordFormControl.value).then(data=>{
      // console.log('user', data.user);
      
      this.api.createUser(data.user.uid, {
        name: this.nameFormControl.value, 
        email: this.emailFormControl.value,
        uid: data.user.uid,
        password: this.passwordFormControl.value,
        address: this.addressFormControl.value,
        conversations:[]
      }).then(()=>{
        localStorage.setItem('uid', data.user.uid)
        alert('your account have successfully created')
        this.router.navigate(['/profile']).then(()=>{
          this.api.setCurrentUser(data.user.uid)
         //  console.log(this.api.currentUser)
        })
      });
    },err=>{
this.helper.openSnackBar(err.message, 'Close');
this.emailFormControl.reset();
this.passwordFormControl.reset();

    })
  }

}