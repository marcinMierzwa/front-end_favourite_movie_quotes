import { Component, inject, input, InputSignal, output, Signal } from '@angular/core';
import { StateService } from '../../Services/State/state.service';
import { FormConfig, InputConfig } from '../../Models/form-config.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../Services/Form/form.service';
import { SubmitForm } from '../../Models/form/submit-form.type';


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
  readonly errorMessage: Signal<string | null> = this.stateService.errorMessage;
  config: InputSignal<FormConfig> = input.required<FormConfig>();
  

  isPasswordVisible = false;
  form!: FormGroup;
  sendForm = output<SubmitForm>();

  ngOnInit() {
    this.form = this.formService.createForm(this.config());
  }

  getError(fieldId: string): string | null {
    return this.formService.getFieldErrors(this.form, fieldId, this.config().inputsConfig);
  }

  togglePasswordVisibility(input: InputConfig): void {
    input.isContentIncrypted = !input.isContentIncrypted;
  } 

  onSubmit(event: Event) {    
    event.preventDefault();
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }
    const submitedForm = this.form.getRawValue();
    this.sendForm.emit(submitedForm);
    this.form.reset();
  }
}
    
  



