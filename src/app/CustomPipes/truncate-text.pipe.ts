import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true,
})
export class TruncateTextPipe implements PipeTransform {

  transform(text: string, limit: number): string {

    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= limit) {
      return text;
    }

    const truncated = words.slice(0, limit).join(' ');
    return `${truncated} (...)`;
  }
}
