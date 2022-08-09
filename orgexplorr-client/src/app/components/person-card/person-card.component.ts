import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/Person';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent implements OnInit {
  @Input() person: Person;

  constructor() {}

  ngOnInit() {}

  getPhoneNumberHref() {
    return `tel:${this.person.phone}`;
  }

  getMailToHref() {
    return `mailto:${this.person.email}`;
  }
}
