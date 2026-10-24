export class RequestPasswordResetModel {
  email!: string;
  captchaResponse!: string | null;

  message!: string | null;
  hasError: boolean = false;
}
