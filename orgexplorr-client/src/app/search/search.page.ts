import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PeopleService } from '../services/people.service';
import { Person } from '../models/Person';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchTerm: string;
  searchResults: Person[];
  toggled: boolean = false;

  constructor(
    private peopleService: PeopleService,
    private navCtl: NavController
  ) {}

  ngOnInit() {}

  async doSearch() {
    if (!this.searchTerm) {
      this.searchResults = [];
    }
    this.searchResults = await this.peopleService.search(this.searchTerm);
  }

  onNavigate(id: number) {
    this.navCtl.navigateForward(`people/${id}`);
  }

  hasSearchResults() {
    return this.searchResults && this.searchResults.length > 0;
  }

  onToggle() {
    this.toggled = !this.toggled;
  }
}
