import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PeopleService } from '../services/people.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  personId: number;
  person: Person;
  reports: Person[];

  constructor(
    private peopleService: PeopleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.personId = this.activatedRoute.snapshot.parent.parent.params.id;
    this.person = await this.peopleService.getPerson(this.personId);
    this.reports = await this.peopleService.getSubordinates(this.personId);
  }

  hasReports() {
    return this.reports && this.reports.length > 0;
  }
}
