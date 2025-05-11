import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateUserName',
  standalone: true,
})
export class TruncateUserName implements PipeTransform {

  transform(userName: string, lettersLimit: number): string {

    if (!userName) return '';
    if (userName.length <= lettersLimit) {
      return userName;
    }

    const truncatedUserName = userName.slice(0, lettersLimit);
    return `${truncatedUserName} ...`;
  }
}