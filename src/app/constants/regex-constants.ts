export abstract class RegexConstants {
  static readonly usernameRegex: string | RegExp = "^[A-Za-z][A-Za-z0-9_]{2,12}$";
  static readonly passwordRegex: string | RegExp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
  static readonly nameRegex: string|RegExp="^[A-Z][a-z]{2,}$";
  static phoneRegex: string | RegExp = "^[9][0-9]{9}";


}
