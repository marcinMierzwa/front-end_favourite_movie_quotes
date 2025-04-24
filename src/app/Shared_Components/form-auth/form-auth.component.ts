import { Component, inject, input, InputSignal, output, Signal } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { InputConfig } from '../../Models/form-config.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../Services/Form/form.service';
import { SignUpFormInterface } from '../../Layout/sign-up/Models/sign-up-form.interface';
import { SubmitedForm } from './Models/submited-form.type';


@Component({
  selector: 'app-form-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-auth.component.html',
  styleUrl: './form-auth.component.scss'
})
export class FormAuthComponent {
  private stateService: StateService = inject(StateService);
  private formService: FormService = inject(FormService);
  readonly isMobileMode = this.stateService.isScrollMode;
  readonly heading: InputSignal<string> = input.required();
  readonly submitLabel: InputSignal<string> = input.required();
  readonly errorMessage: Signal<string | null> = this.stateService.errorMessage;
  inputsData: InputSignal<InputConfig[]> = input<InputConfig[]>([]);
  isPasswordVisible = false;
  form!: FormGroup;
  sendForm = output<SignUpFormInterface>();

  ngOnInit() {
    this.form = this.formService.createForm(this.inputsData());
  }

  getError(field: string): string | null {
    return this.formService.getFieldErrors(this.form, field, this.inputsData());
  }

  togglePasswordVisibility(inputName: string): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.inputsData().filter((input: InputConfig) => {
      if(input.name === inputName) {
        input.isContentIncrypted = !input.isContentIncrypted;
      }
    })
  } 

  onSubmit(event: Event) {
    event.preventDefault()
    const submitedForm: SubmitedForm = this.form.getRawValue();
    this.sendForm.emit(submitedForm);
    this.form.reset();
    }
    
    
    // const config = new MatSnackBarConfig();
    // config.duration = 3000;  // Czas trwania SnackBar
    // config.horizontalPosition = 'center'; // Pozycja pozioma
    // config.verticalPosition = 'bottom';      // Pozycja pionowa
    // config.panelClass = ["my-snackbar"];  // Klasa CSS
    // this.snackBar.open('message', 'Close', config);
  


}
