import {
  Component,
  inject,
  input,
  Signal,
  
} from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { Quote } from '../../Models/quote.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { ApiService } from '../../Services/Api/api.service';
import { CardIconsBarComponent } from "../../Shared_Components/card-icons-bar/card-icons-bar.component";
import { RouterLink } from '@angular/router';
import { CardFooterBarComponent } from "../../Shared_Components/card-footer-bar/card-footer-bar.component";
import { AccordionComponent } from "../../Shared_Components/accordion/accordion.component";

@Component({
  selector: 'app-quote-detail',
  standalone: true,
  imports: [CardComponent, CardIconsBarComponent, RouterLink, CardFooterBarComponent, AccordionComponent],
  templateUrl: './quote-detail.component.html',
  styleUrl: './quote-detail.component.scss',
})
export class QuoteDetailComponent {
  apiService: ApiService = inject(ApiService);

  id = input<string>('');
  quote: Signal<Quote | undefined> = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => {
        return this.apiService.getOne(id).pipe(
          catchError((error) => {
            console.error('Błąd podczas pobierania cytatu:', error);
            return of(undefined); 
          })
        );
      })
    ),
    { initialValue: undefined }
  );
}
