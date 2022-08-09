import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../services/people.service';
import { Person } from "../models/Person";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  personId: number;
  chain: Person[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    this.personId = this.activatedRoute.snapshot.parent.parent.params.id;
    this.chain = await this.peopleService.getManagementChain(this.personId);
    console.log(this.chain)
  }

  hasManagementChain() {
    return this.chain && this.chain.length > 0;
  }
}
