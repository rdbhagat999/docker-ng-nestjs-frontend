import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(formGroup: FormGroup) {

  const control = formGroup.get('password');
  const matchingControl = formGroup.get('password_confirm');

  return (control.value === matchingControl.value) ? null :  { mustMatch: true };
}
