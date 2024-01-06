import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {inject, Injectable} from "@angular/core";
import {RegexConstants} from "../constants/regex-constants";

@Injectable({
  providedIn: "root"
})
export class CustomValidatorService {
  protected readonly regexConstants = RegexConstants

  usernameValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      const regex: RegExp = this.regexConstants.usernameRegex as RegExp;
      const valid = regex.test(control.value);
      return valid ? null : {invalidUsername: true}
    }

  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any}|null => {
      if (!control.value) {
        return null;
      }
      const regex: RegExp = this.regexConstants.passwordRegex as RegExp;
      const valid = regex.test(control.value);
      return valid ? null :  {invalidPassword: true}
    }
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors["passwordMismatch"]) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({passwordMismatch: true});
        return {error: 'not matched'}
      } else {
        confirmPasswordControl.setErrors(null);
        return null
      }
    }
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value as number;
      if (!value) {
        return null;
      }
      if (value > 9600000000 && value < 9890000000) {
        return null
      } else return {invalidPhone: true}
    }
  }



}
