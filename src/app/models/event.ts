import { Timestamp } from '@firebase/firestore-types';

export interface Event{
    id:string;
    date: Timestamp ;
    dateCreated:Timestamp;
    information:string;
    name:string;
    numberNeeded:number;
    picID:Array<string>;
    userID:string;
    venue:string;
    imageUrl:string;
  }

  export interface EventId extends Event { id: string; }