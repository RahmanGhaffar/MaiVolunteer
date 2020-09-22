import { stringify } from 'querystring';

export class Signup{

    name:string;
    gender:string;
    email:string;
    password:string;
    repassword:string;
    phone:string;
    type:string;
        
    constructor(
        name:string,
        gender:string,
        email:string,
        password:string,
        repassword:string,
        phone:string,
        type:string
    ){
        this.name=name;
        this.gender=gender;
        this.email=email;
        this.password=password;
        this.repassword=repassword;
        this.phone=phone;
        this.type=type;

    }
}