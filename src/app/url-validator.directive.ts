import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appUrlValidator]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UrlValidatorDirective,
    multi: true
  }]
})
export class UrlValidatorDirective implements Validator {

  validate(control: AbstractControl<string>): ValidationErrors | null {
    // set an invalidUrlLength error if the url is less than 1 character
    if (control.value?.length < 1) {
      return {invalidUrlLength: true}
    }

    // set an invalidUrlFormat error if the url string can't be used to create a URL object
    try {
      new URL(control.value);
      return null;
    } catch {
      return {invalidUrlFormat: true};
    }
  }

}
