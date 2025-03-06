import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { InputConfig } from '../../Models/form-config.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: NonNullableFormBuilder) {}

  createForm(inputsConfig: InputConfig[]): FormGroup {
    const formGroup: { [key: string]: FormControl<any> } = {};

    inputsConfig.forEach(input => {
      const validators = this.mapValidators(input.validation);
      formGroup[input.name] = this.fb.control('', validators);
    });
    return this.fb.group(formGroup);
  }

  private mapValidators(validations: any[]): any[] {
    return validations.map(v => {
      switch (v.validator) {
        case 'required': return Validators.required;
        case 'email': return Validators.email;
        case 'minLength': return Validators.minLength(v.value);
        case 'maxLength': return Validators.maxLength(v.value);
        case 'pattern': return Validators.pattern(v.value);
        default: return null;
      }
    }).filter(v => v !== null);
  }

  getFieldErrors(form: FormGroup, fieldName: string, inputsConfig: InputConfig[]): string | null {
    const field = form.get(fieldName);
    if (!field || !field.errors) return null;

    const fieldConfig = inputsConfig.find(input => input.name === fieldName);
    if (!fieldConfig) return null;

    for (const validation of fieldConfig.validation) {
      if (field.hasError(validation.validator)) {
        return validation.errorMsg;
      }
    }

    return null;
  }

  
}