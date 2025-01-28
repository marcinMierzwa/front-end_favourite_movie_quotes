import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { Quote } from '../../Models/quote.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { ApiService } from '../../Services/Api/api.service';

@Component({
  selector: 'app-quote-detail',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './quote-detail.component.html',
  styleUrl: './quote-detail.component.scss',
})
export class QuoteDetailComponent {
  apiService: ApiService = inject(ApiService);

  id = input<string>('');
  quote: Signal<Quote | undefined> = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => {
        return this.apiService.getOne(id);
      })
    ),
    { initialValue: undefined }
  );

  // eff = effect(() => console.log(this.quote()));
}
