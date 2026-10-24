export class LoginModel {
  email!: string;
  jwt!: string | null;

  message!: string | null;
  hasError: boolean = false;
}
