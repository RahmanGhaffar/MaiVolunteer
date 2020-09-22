import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface EventDetail{
    id?:string;
    date?: Date;
    dateCreated?:Date;
    information?:string;
    name?:string;
    numberNeeded?:number;
    picID?:Array<string>;
    userID?:string;
    venue?:string;
  }