export class ServiceConstants {
  // public static DOMAIN = 'https://test.in';
  public static LOCAL = "http://127.0.0.1:4040/";
  public static IP = ServiceConstants.LOCAL;
  public static USER = "api/user/";
}

export class ApiUrl {
  public static CHECK_LOGIN =
    ServiceConstants.IP + ServiceConstants.USER + "me";
  public static LOGIN =
    ServiceConstants.IP + ServiceConstants.USER + "login";
  public static LOGOUT =
    ServiceConstants.IP + ServiceConstants.USER + "logout";
  public static REGISTER_USER =
    ServiceConstants.IP + ServiceConstants.USER + "register_user";
}
