export abstract class RegexConstants {
  static readonly usernameRegex: RegExp = /^[A-Za-z][A-Za-z0-9_]{2,12}$/;
  static readonly passwordRegex: string | RegExp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
  static readonly nameRegex: RegExp=/^[A-Z][a-z]{2,}$/;
  static readonly firstLetterCapital:RegExp = /^[A-Z]/
  static readonly phoneRegex: string | RegExp = "^[9][678][0-9]+";
  static readonly accountNameRegex: string|RegExp = "^[A-Z][a-z]{1,}(?: [A-Z][a-z]*){0,2}$";
  static readonly accountNumberRegex:string|RegExp = "^[0-9]{9,20}$"

  static readonly isbnNumberRegex:string|RegExp = '^[0-9]{3,13}'
  static readonly addressRegex:string|RegExp = '^[a-zA-Z0-9, -]*[a-zA-Z][a-zA-Z0-9, -]*$'
  static readonly titleCaseRegex:RegExp = /\\b(?:[A-Z][a-z]*\\b\\s*)+/
  static readonly containingSpecialCharacters:RegExp = /[!@#$%^&*()_+{}|:"<>?,/;']/
  static readonly beginningWithSpace:RegExp = /[ ]+[A-Za-z]/
  static readonly withMiddleName:RegExp = /^[A-Z][a-z]*(?: [A-Z][a-z]*)?$/
  static readonly trailingSpaces:RegExp = /\s+$/
  static readonly moreThanOneSpaceInBetween:RegExp=/\w+\s{2,}\w+/
  static readonly capitalBetweenWord:RegExp=/\b[A-Za-z]+[A-Z][A-Za-z]*\b/
  static readonly numberRegex:RegExp = /[0-9]/
}
