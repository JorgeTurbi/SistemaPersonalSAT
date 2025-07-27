import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get(password)?.value;
    const confirm = control.get(confirmPassword)?.value;

    if (pass !== confirm) {
      control.get(confirmPassword)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  };
}
