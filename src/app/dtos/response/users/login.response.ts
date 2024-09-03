export class LoginResponse {
  accessToken: string;

  constructor(data: LoginResponse) {
    this.accessToken = data.accessToken;
  }
}
