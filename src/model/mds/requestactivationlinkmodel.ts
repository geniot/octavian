export class RequestActivationLinkModel {
  email!: string;
  captchaResponse!: string | null;

  message!: string | null;
  hasError: boolean = false;
}
