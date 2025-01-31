import { inject, Pipe, PipeTransform } from '@angular/core';
import { StateService } from '../Services/State/state.service';

@Pipe({
  name: 'truncateText',
  standalone: true,
})
export class TruncateTextPipe implements PipeTransform {
  private stateService: StateService = inject(StateService);

  transform(text: string, limit: number): string {

    // if(this.stateService.isScrollMode()) {
    //   return text;
    // }
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= limit) {
      return text;
    }

    const truncated = words.slice(0, limit).join(' ');
    return `${truncated} (...)`;
  }
}
