import { Pipe, PipeTransform } from '@angular/core';

import { User } from './user';

@Pipe({ name: 'w4UserName', pure: true })
export class W4UserName implements PipeTransform {
  // TODO: find out if 'null = null' is needed or can just be 'null'
  transform(userObj: User | null = null, notFound: string = 'User not found'): string {
    if (typeof (userObj) === 'undefined' || userObj === null) {
      return notFound;
    }
    if (userObj.hasOwnProperty('attributes')) {
      if (userObj.attributes.hasOwnProperty('fullName')) {
        if (userObj.attributes.fullName && userObj.attributes.fullName.trim()) {
          return userObj.attributes.fullName;
        }
      }
    }
    return '';
  }
}
