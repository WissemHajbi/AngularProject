import { Component } from '@angular/core';
import { Tour } from '../../models/tour';
import { TourService } from '../../services/tour.service';

@Component({ selector: 'app-tour-list', templateUrl: './tour-list.component.html' })
export class TourListComponent {
  tours: Tour[] = [];
  adherentId!: number;
  constructor(private tourService: TourService) {}
  ngOnInit() { this.getAllTours(); }
  getAllTours() { this.tourService.getAllTours().subscribe(data => { this.tours = data; }); }
  getToursByIDAdherant() { this.tourService.getToursByIDAdherant(this.adherentId).subscribe(data => { this.tours = data; }); }
  retournerTour(id: number) { this.tourService.retournerTour(id).subscribe(() => this.getAllTours()); }
}
