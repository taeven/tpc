export class CheckLoginResponse {
  public status: number;
  public message: string;
  public username: string;
  public token: string;
}

export class LogoutResponse {
  public status: number;
  public message: string;
}
