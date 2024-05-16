import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'frontend-event-details',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
	eventId!: string;
	events: any[] = [];

	constructor(private route: ActivatedRoute, private http: HttpClient) {}

	/*ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      console.log('Event ID:', this.eventId);

      if(this.eventId)
        this.loadEvent(this.eventId);
        console.log("Loaded Event Successfully!");
    })
  }

  private loadEvent(eventId: string){
    this.http.get<any>(`api/event`).subscribe({
      next: (event) => {this.events = event;},
      error: (err) => console.error('Failed to load event:', err),
    });
  }*/

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.eventId = params['id'];
			console.log(this.eventId);
		});
		this.getEvents();
	}

	getEvents(): void {
		this.http.get<any[]>('api/timeline').subscribe((events) => {
			this.events = events;
		});
	}

	isEventId(id: string): boolean {
		return this.eventId === id;
	}
}
