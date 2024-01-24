import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {inject, Injectable} from "@angular/core";
import {RegexConstants} from "../../constants/regex-constants";
import {map, Observable, of} from "rxjs";
import {UserService} from "./userService";

@Injectable({
  providedIn: "root"
})
export class CustomValidatorService {
  protected readonly regexConstants = RegexConstants
  private userService: UserService = inject(UserService)


  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }
      const username = control.value
      let error: null | Observable<object>
      this.userService.usernameExists(username).pipe(
        map(response => response.success ? of({usernameTaken: 'true'}) : of(null))
      )
      return of(null);
    }

  }


  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null
      }
      const valid = regex.test(control.value)
      return valid ? null : error
    }
  }
  static containingPatternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null
      }
      const valid = regex.test(control.value)
      return valid ? error : null
    }
  }


  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex: RegExp = this.regexConstants.passwordRegex as RegExp;
      const valid = regex.test(control.value);
      return valid ? null : {invalidPassword: true}
    }
  }

  static matchPassword(password: string, confirmPassword: string) {
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
