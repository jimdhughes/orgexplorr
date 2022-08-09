import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-person-list-item',
  templateUrl: './person-list-item.component.html',
  styleUrls: ['./person-list-item.component.scss'],
})
export class PersonListItemComponent {
  @Input() person: Person;

  @Input() overrideRoute?: string[];

  constructor() {}

  getRouterLink() {
    if (this.overrideRoute) {
      return this.overrideRoute;
    }
    return ['/people', this.person.id];
  }
}
