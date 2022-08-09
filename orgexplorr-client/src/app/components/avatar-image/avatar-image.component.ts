import { Component, Input, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss'],
})
export class AvatarImageComponent implements OnInit {
  @Input()
  email: string;

  @Input()
  size: number = 50;
  constructor() {}

  ngOnInit() {}

  getImageUrl(): string {
    const url = `https://www.gravatar.com/avatar/${this.getImageHash()}?d=robohash&s=${
      this.size
    }`;
    return url;
  }

  getImageHash() {
    if (this.email) {
      return Md5.hashStr(this.email);
    }
    return Md5.hashStr('default');
  }
}
