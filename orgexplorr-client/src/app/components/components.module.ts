import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarImageComponent } from './avatar-image/avatar-image.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { PersonListItemComponent } from './person-list-item/person-list-item.component';
import { RouterModule } from '@angular/router';
import { ProfileImageComponent } from './profile-image/profile-image.component';

const components = [
  AvatarImageComponent,
  PersonCardComponent,
  PersonListItemComponent,
  ProfileImageComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule {}
