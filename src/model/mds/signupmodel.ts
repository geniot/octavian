export class SignupModel {
  email!: string;
  captchaResponse!: string | null;

  message!: string | null;
  hasError: boolean = false;
}
