import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../services/people.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  personId: number;
  person: Person;
  comparePerson: Person;
  firstChain: Person[];
  secondChain: Person[];
  searchResults: Person[];
  commonManager: Person;
  searchTerm: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    this.personId = this.activatedRoute.snapshot.parent.parent.params.id;
    this.firstChain = await this.peopleService.getManagementChain(
      this.personId
    );
    this.person = await this.peopleService.getPerson(this.personId);
  }

  async doSearch(term) {
    if (!term.detail.value) {
      this.commonManager = null;
      this.comparePerson = null;
      this.secondChain = null;
      this.searchResults = [];
    }
    this.searchResults = await this.peopleService.search(term.detail.value);
  }

  hasSearchResults() {
    return this.searchResults && this.searchResults.length > 0;
  }

  hasManagementChain() {
    return this.firstChain && this.firstChain.length > 0;
  }

  hasSecondManagementChain() {
    return (
      this.secondChain && this.secondChain.length > 0 && this.comparePerson
    );
  }

  async getCommonManager() {
    if (this.hasManagementChain && this.hasSecondManagementChain) {
      this.commonManager = await this.peopleService.getCommonManager(
        this.firstChain,
        this.secondChain
      );
    }
  }

  async onSelect(p: Person) {
    this.searchTerm = '';
    this.comparePerson = await this.peopleService.getPerson(p.id);
    this.secondChain = await this.peopleService.getManagementChain(p.id);
    this.searchResults = [];
    this.getCommonManager();
  }
}
