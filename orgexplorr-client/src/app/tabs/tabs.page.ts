import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../services/people.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  private person: Person;
  private personId: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private peopleService: PeopleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.personId = this.activatedRoute.snapshot.params.id;
    this.person = await this.peopleService.getPerson(this.personId);
  }

  onClose() {
    this.router.navigateByUrl('/');
  }
}
