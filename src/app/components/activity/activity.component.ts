import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  events: Event[];
  
  constructor(
    public eventService: EventService,
    private router?: Router,
  ) { }
  


  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events=>{
      // console.log(events);
      this.events=events;
    });
  }

  deleteEvent(event, e: Event){
    this.eventService.deleteEvent(e);

  }

  onSelect(event){
    this.router.navigate(['/activity',event.id])
    // this.api.setCurrentEvent(event.id);
    
  }

}
