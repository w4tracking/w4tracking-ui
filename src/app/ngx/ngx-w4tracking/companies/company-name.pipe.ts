import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'w4CompanyName', pure: true })
export class CompanyNamePipe implements PipeTransform {
  transform(name: string): any {
    return name ? name.replace(/_/g, ' ') : name;
  }
}
