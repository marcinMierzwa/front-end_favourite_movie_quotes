import { Injectable } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  NonNullableFormBuilder,
  ValidatorFn,
} from '@angular/forms';
import {
  FormConfig,
  GroupValidationRule,
  InputConfig,
} from '../../Models/form-config.interface';
import { passwordsMatchValidator } from '../../Validators/password-match.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: NonNullableFormBuilder) {}

  createForm(config: FormConfig): FormGroup {
    const formGroupConfig: { [key: string]: FormControl<any> } = {};

    config.inputsConfig.forEach((input) => {
      const validators = this.mapValidators(input.validation);
      formGroupConfig[input.id] = this.fb.control('', validators);
    });

    const groupValidators = this.mapGroupValidators(
      config.groupValidation || []
    );

    return this.fb.group(formGroupConfig, {
      validators: groupValidators,
    });
  }

  private mapGroupValidators(
    groupValidations: GroupValidationRule[]
  ): ValidatorFn[] {
    return groupValidations.map((rule) => {
      switch (rule.validator) {
        case 'passwordsMatch':
          return passwordsMatchValidator();
        default:
          return () => null;
      }
    });
  }

  private mapValidators(validations: any[]): any[] {
    return validations
      .map((v) => {
        switch (v.validator) {
          case 'required':
            return Validators.required;
          case 'email':
            return Validators.email;
          case 'minLength':
            return Validators.minLength(v.value);
          case 'maxLength':
            return Validators.maxLength(v.value);
          case 'pattern':
            return Validators.pattern(v.value);
          case 'passwordsMismatch':
            return Validators.nullValidator;
          default:
            return null;
        }
      })
      .filter((v) => v !== null);
  }

  getFieldErrors(
    form: FormGroup,
    fieldId: string,
    inputsConfig: InputConfig[]
  ): string | null {
    const field = form.get(fieldId);

    if (!field || !field.errors || !field.touched) {
      return null;
    }

    const fieldConfig = inputsConfig.find((input) => input.id === fieldId);
    if (!fieldConfig) {
      return null;
    }

    for (const validation of fieldConfig.validation) {
      if (field.hasError(validation.validator)) {
        return validation.errorMsg;
      }
    }

    return null;
  }
}
