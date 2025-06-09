import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirm-password');

    // Jeśli hasła są różne i oba pola zostały dotknięte, ustawiamy błąd.
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      // Ustawiamy błąd na kontrolce confirmPassword, aby łatwiej go było wyświetlić
      confirmPassword.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }
    
    // Jeśli błąd był wcześniej ustawiony, ale teraz hasła pasują, czyścimy go
    if (confirmPassword?.hasError('passwordsMismatch')) {
      // Usuwamy tylko ten konkretny błąd, nie naruszając innych
      const { passwordsMismatch, ...errors } = confirmPassword.errors || {};
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };
}