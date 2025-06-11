import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordsMismatch')) {
      const { passwordsMismatch, ...errors } = confirmPassword.errors || {};
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };
}