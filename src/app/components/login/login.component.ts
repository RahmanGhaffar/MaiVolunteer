import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { LoginService } from "../../services/login.service";
import { ApiService } from '../chat-new/services/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../chat-new/services/auth/auth.service';
import { HelperService } from '../chat-new/services/helper/helper.service';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  emailFormControl = new FormControl('moeidsaleem@gmail.com', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('moeid123', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    private loginService: LoginService,
    private api:ApiService,
    private helper:HelperService,
    private router:Router,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
  }

  loginUser(email, password){
    console.log(email.value);
    console.log(password.value);
  //   let login = new Login(email.value, password.value);
  //   this.loginService.login(login).subsc
    
  }
  login(){
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

    // login user  
    this.auth.login(this.emailFormControl.value , this.passwordFormControl.value).then(data=>{
      alert("Login Success");
     console.log('data', data)
      // user login 
      this.router.navigate(['/profile']).then(()=>{
        this.api.setCurrentUser(data.user.uid)
       //  console.log(this.api.currentUser)
      })
    },err=> this.helper.openSnackBar(err.message, 'Close'))
  }

}