import {
  Component,
  inject,
  input,
  Signal,
  
} from '@angular/core';
import { CardComponent } from '../../Shared_Components/card/card.component';
import { Quote } from '../../Models/quote.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../Services/Api/api.service';
import { CardIconsBarComponent } from "../../Shared_Components/card-icons-bar/card-icons-bar.component";
import { RouterLink } from '@angular/router';
import { CardFooterBarComponent } from "../../Shared_Components/card-footer-bar/card-footer-bar.component";
import { AccordionComponent } from "../../Shared_Components/accordion/accordion.component";
import { StateService } from '../../Services/State/state.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-quote-detail',
  standalone: true,
  imports: [CardComponent, CardIconsBarComponent, RouterLink, CardFooterBarComponent, AccordionComponent, MatProgressSpinnerModule],
  templateUrl: './quote-detail.component.html',
  styleUrl: './quote-detail.component.scss',
})
export class QuoteDetailComponent {
  private apiService: ApiService = inject(ApiService);
  private stateService: StateService = inject(StateService);
  isLoading = this.stateService.isLoading;

  id = input<string>('');
  quote: Signal<Quote | undefined> = toSignal(
    toObservable(this.id).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap((id) =>
        this.apiService.getOneQuote(id).pipe(
          catchError((error) => {
            console.error("error when downloading a quote", error);
            return of(undefined);
          }),
          finalize(() => this.isLoading.set(false)) 
        )
      ),
    ),
    { initialValue: undefined }
  );
}
